const User = require("../models/UserModel"); // Import the User model
const orderService = require("../services/orderService");
const sendEmailMessage = require("../utility/sendEmail");
const generateOrderEmailHTML = require("../utility/orderEmailTemplate");

const createOrder = async (req, res) => {
  try {
    const { userId, rewardPointsUsed = 0, ...rawOrderData } = req.body;

    // Sanitize order data to prevent users from setting admin-only fields
    const { specialDiscount, adminNote, orderSource, ...orderData } = rawOrderData;

    let user = null;

    const phoneNumber = orderData?.shippingInfo?.mobileNo;
    if (phoneNumber) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const existingOrder = await require("../models/OrderModel").findOne({
        "shippingInfo.mobileNo": phoneNumber,
        orderDate: { $gte: oneHourAgo },
      });

      if (existingOrder) {
        return res.status(429).json({
          success: false,
          message: "আপনি ইতিমধ্যে একটি অর্ডার করেছেন। এক ঘণ্টার মধ্যে আবার অর্ডার করতে পারবেন না।",
        });
      }
    }

    if (userId) {
      user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const rewardPointsUsedNumber = Number(rewardPointsUsed);
      const userRewardPoints = Number(user.rewardPoints || 0);

      if (rewardPointsUsedNumber > userRewardPoints) {
        return res.status(400).json({
          success: false,
          message:
            "You cannot use more reward points than you have available.",
        });
      }
    }

    // ✅ Create order first
    const order = await orderService.createOrder(
      { ...orderData, rewardPointsUsed },
      userId || null
    );

    // ✅ Update reward points
    if (user && rewardPointsUsed > 0) {
      user.rewardPoints -= Number(rewardPointsUsed);
      await user.save();
    }

    // ✅ Populate products and shipping method
    await order.populate([
      { path: "items.productId", select: "name" },
      { path: "shippingId", select: "name" },
    ]);

    // ✅ Respond to client immediately
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

    // ===============================
    // 🔥 Background Email (Non-blocking)
    // ===============================
    process.nextTick(async () => {
      try {
        const emailHTML = generateOrderEmailHTML(order);

        await sendEmailMessage(
          emailHTML,
          `New Order Received #${order.orderNo} `,
          true
        );

      } catch (err) {
        console.error(
          "Email failed (non-blocking):",
          err.message
        );
      }
    });

  } catch (error) {
    console.error("Order Creation Error:", error);

    res.status(500).json({
      success: false,
      message: "Error creating order: " + error.message,
    });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const { orderStatus, page, limit, search, startDate, endDate } = req.query;

    const filter = {};
    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }

    const usePagination = page && limit;
    const pageNum = usePagination ? parseInt(page) : null;
    const limitNum = usePagination ? parseInt(limit) : null;

    const { totalOrders, orders, totalPages, currentPage } =
      await orderService.getAllOrders(
        filter,
        pageNum,
        limitNum,
        search,
        startDate,
        endDate,
      );

    res.status(200).json({
      success: true,
      totalOrders,
      totalPages,
      currentPage,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const updateData = req.body;
  try {
    const updatedOrder = await orderService.updateOrder(orderId, updateData);
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await orderService.deleteOrder(orderId);
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get order by Order No
const getOrderByOrderNo = async (req, res) => {
  const { orderNo } = req.params;
  try {
    const order = await orderService.getOrderByOrderNo(orderNo);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get oder by Registered User
const getOrdersForUser = async (req, res) => {
  try {
    const userId = req.params.userId; // get userId from URL parameter

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const result = await orderService.getOrdersByUserId(userId);

    if (!result || result.totalOrders === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user" });
    }

    return res.status(200).json({
      success: true,
      totalOrders: result.totalOrders,
      orders: result.orders,
    });
  } catch (error) {
    console.error("Fetch error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Unknown error occurred while fetching orders",
    });
  }
};

const trackOrderByOrderNoAndPhone = async (req, res) => {
  try {
    const { orderNo, phone } = req.body;

    if (!orderNo || !phone) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Order number and phone are required",
        });
    }

    const order = await orderService.trackOrderByOrderNoAndPhone(
      orderNo,
      phone,
    );

    return res.status(200).json({ success: true, order });
  } catch (error) {
    if (
      error.message === "Order not found" ||
      error.message === "Phone number does not match order"
    ) {
      return res.status(404).json({ success: false, message: error.message });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};




// Update multiple order statuses
const updateMultipleOrderStatuses = async (req, res) => {
  const { orderIds, orderStatus } = req.body;
  if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Order IDs are required and must be an array.",
      });
  }
  if (!orderStatus) {
    return res
      .status(400)
      .json({ success: false, message: "Order status is required." });
  }
  try {
    const result = await orderService.updateMultipleOrderStatuses(
      orderIds,
      orderStatus,
    );
    res
      .status(200)
      .json({
        success: true,
        message: `${result.totalUpdated} orders updated successfully.`,
        ...result,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bulk delete orders
const bulkDeleteOrders = async (req, res) => {
  const { orderIds } = req.body;
  if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Order IDs are required and must be an array.",
      });
  }
  try {
    const result = await orderService.bulkDeleteOrders(orderIds);
    res
      .status(200)
      .json({
        success: true,
        message: `${result.totalDeleted} orders deleted successfully.`,
        ...result,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create order from admin
const createAdminOrder = async (req, res) => {
  try {
    const { userId, rewardPointsUsed = 0, ...orderData } = req.body;

    let user = null;

    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const rewardPointsUsedNumber = Number(rewardPointsUsed);
      const userRewardPoints = Number(user.rewardPoints || 0);

      if (rewardPointsUsedNumber > userRewardPoints) {
        return res.status(400).json({
          success: false,
          message: "You cannot use more reward points than you have available.",
        });
      }
    }

    // Create order with admin source
    const order = await orderService.createOrder(
      { ...orderData, rewardPointsUsed, orderSource: "admin" },
      userId || null,
    );

    if (user && rewardPointsUsed > 0) {
      user.rewardPoints -= Number(rewardPointsUsed);
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: "Admin order created successfully",
      order,
    });
  } catch (error) {
    console.error("Admin Order Creation Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating admin order: " + error.message,
    });
  }
};

// Exporting the controller functions
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderByOrderNo,
  getOrdersForUser,
  trackOrderByOrderNoAndPhone,
  updateMultipleOrderStatuses,
  bulkDeleteOrders,
  createAdminOrder
};