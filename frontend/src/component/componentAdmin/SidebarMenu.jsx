import {
  FaHome,
  FaSearch,
  FaCog,
  FaThLarge,
  FaTags,
  FaCreditCard,
  FaSlidersH,
  FaUserShield,
  FaSignOutAlt,
  FaShoppingBag,
  FaClipboardList,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import useAuthAdminStore from "../../store/AuthAdminStore.js";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useProductStore from "../../store/useProductStore.js";
import useOrderStore from "../../store/useOrderStore.js";
import React, { useEffect, useRef } from "react";
import RequirePermission from "./RequirePermission.jsx";

import { CircularProgress } from "@mui/material";

export default function SidebarMenu() {
  const { totalProductsAdmin } = useProductStore();
  const { logout, token } = useAuthAdminStore();
  const { totalByStatus, fetchAllStatusCounts } = useOrderStore();
  const { loading } = useAuthAdminStore();
  const fetchCounts = useRef(fetchAllStatusCounts);
  fetchCounts.current = fetchAllStatusCounts;

  useEffect(() => {
    if (!token) return;
    fetchCounts.current();
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => fetchCounts.current(), 5000);
    return () => clearInterval(interval);
  }, []);
  // To access delivered count
  const pendingCount = totalByStatus.pending;
  const approvedCount = totalByStatus.approved;
  const intransitCount = totalByStatus.intransit;
  const deliveredCount = totalByStatus.delivered;
  const returnedCount = totalByStatus.returned;
  const cancelledCount = totalByStatus.cancelled;

  const totalOrders = Object.values(totalByStatus).reduce(
    (acc, count) => acc + count,
    0,
  );

  const navigate = useNavigate();
  // Logout function to clear the admin state and navigate to login
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="w-64 mt-100 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="w-fit p-4 h-screen overflow-y-auto ">
      {/* Dashboard */}
      <ul>
        <RequirePermission permission="dashboard" fallback={true}>
          <li className="flex items-center space-x-2 p-2 rounded-md cursor-pointer">
            <Link to="/admin/dashboard" className={"flex items-center gap-2"}>
              <FaHome /> <span>Dashboard</span>
            </Link>
          </li>
        </RequirePermission>
      </ul>

      {/* Website Config */}
      <div>
        <ul className="space-y-1">
          <RequirePermission permission="website_theme_color" fallback={true}>
            <li className="flex items-center space-x-2 p-2 rounded-md cursor-pointer">
              <Link
                to="/admin/general-info"
                className={"flex items-center gap-2"}
              >
                <FaThLarge /> <span>General Info</span>
              </Link>
            </li>
          </RequirePermission>

          <RequirePermission permission="home_page_seo" fallback={true}>
            <Link to="/admin/homepage-seo">
              <li className="flex items-center space-x-2 p-2 rounded-md cursor-pointer">
                <FaSearch /> <span>Home Page SEO</span>
              </li>
            </Link>
          </RequirePermission>
        </ul>
      </div>

      {/* E-Commerce Modules */}
      <div>
        <ul className="space-y-1">
          <RequirePermission
            permission={[
              "setup_config",
              "product_size",
              "product_flag",
              "scroll_text",
              "delivery_charges",
              "manage_coupons",
            ]}
            match="any"
            fallback={true}
          >
            <li className="flex items-center space-x-2 p-2 rounded-md cursor-pointer">
              <Accordion
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  width: "100%",
                }}
                sx={{
                  color: "white", // Ensures text color is white
                  "& .MuiAccordionSummary-root": {
                    backgroundColor: "transparent",
                    minHeight: "auto", // Removes unnecessary padding
                    padding: "0", // Removes default padding
                  },
                  "& .MuiAccordionDetails-root": {
                    backgroundColor: "transparent",
                    paddingLeft: "0", // Ensures no extra left padding
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white", // Ensures the dropdown icon is white
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="p-2 flex items-center"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <FaCog /> <span>Config</span>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className={"space-y-2 pl-4"}>
                    <RequirePermission
                      permission="setup_config"
                      fallback={true}
                    >
                      <li>
                        <Link to="/admin/configsetup">Setup Your Config</Link>
                      </li>
                    </RequirePermission>
                    <RequirePermission
                      permission="product_size"
                      fallback={true}
                    >
                      <li>
                        <Link to="/admin/add-product-size">
                          Add New Product Size
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/product-sizes">
                          View All Product Size
                        </Link>
                      </li>
                    </RequirePermission>

                    <RequirePermission
                      permission="delivery_charges"
                      fallback={true}
                    >
                      <li>
                        <Link to="/admin/deliverycharge">
                          <span>Delivery Charges</span>
                        </Link>
                      </li>
                    </RequirePermission>
                    <RequirePermission
                      permission="manage_coupons"
                      fallback={true}
                    >
                      <li>
                        <Link to="/admin/coupon">
                          <span>Coupon</span>
                        </Link>
                      </li>
                    </RequirePermission>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>
          </RequirePermission>
          <RequirePermission permission="category" fallback={true}>
            <li className="space-x-2 px-2 rounded-md cursor-pointer">
              <Accordion
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  width: "100%",
                }}
                sx={{
                  color: "white", // Ensures text color is white
                  "& .MuiAccordionSummary-root": {
                    backgroundColor: "transparent",
                    minHeight: "auto", // Removes unnecessary padding
                    padding: "0", // Removes default padding
                  },
                  "& .MuiAccordionDetails-root": {
                    backgroundColor: "transparent",
                    paddingLeft: "0", // Ensures no extra left padding
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white", // Ensures the dropdown icon is white
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="p-2 flex items-center"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <FaThLarge /> <span>Category</span>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className={"space-y-2 pl-4"}>
                    <li>
                      <Link to="/admin/addnewcategory">Add New Category</Link>
                    </li>
                    <li>
                      <Link to="/admin/categorylist">View All Categories</Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>
          </RequirePermission>

          <RequirePermission
            permission={[
              "add_products",
              "delete_products",
              "view_products",
              "edit_products",
            ]}
            match="any"
            fallback={true}
          >
            <li className="space-x-2 px-2 rounded-md cursor-pointer">
              <Accordion
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  width: "100%",
                }}
                sx={{
                  color: "white", // Ensures text color is white
                  "& .MuiAccordionSummary-root": {
                    backgroundColor: "transparent",
                    minHeight: "auto", // Removes unnecessary padding
                    padding: "0", // Removes default padding
                  },
                  "& .MuiAccordionDetails-root": {
                    backgroundColor: "transparent",
                    paddingLeft: "0", // Ensures no extra left padding
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white", // Ensures the dropdown icon is white
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="p-2 flex items-center"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <FaTags /> <span>Manage Products</span>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className={"space-y-2 pl-4"}>
                    {/*<RequirePermission*/}
                    {/*  permission="add_products"*/}
                    {/*  fallback={true}*/}
                    {/*>*/}
                    {/*  <li>*/}
                    {/*    <Link to="/admin/addnewproduct">Add New Product</Link>*/}
                    {/*  </li>*/}
                    {/*</RequirePermission>*/}

                    <RequirePermission
                      permission="view_products"
                      fallback={true}
                    >
                      <li>
                        <Link to="/admin/viewallproducts">
                          View All Products({totalProductsAdmin})
                        </Link>
                      </li>
                    </RequirePermission>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>
          </RequirePermission>

          <RequirePermission permission="view_orders" fallback={true}>
            <li className="space-x-2 px-2 rounded-md cursor-pointer">
              <Accordion
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  width: "100%",
                }}
                sx={{
                  color: "white", // Ensures text color is white
                  "& .MuiAccordionSummary-root": {
                    backgroundColor: "transparent",
                    minHeight: "auto", // Removes unnecessary padding
                    padding: "0", // Removes default padding
                  },
                  "& .MuiAccordionDetails-root": {
                    backgroundColor: "transparent",
                    paddingLeft: "0", // Ensures no extra left padding
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white", // Ensures the dropdown icon is white
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="p-2 flex items-center"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <FaShoppingBag /> <span>Manage Orders</span>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className={"space-y-2 pl-4"}>
                    <li>
                      <Link to="/admin/allorders">
                        All Orders ({totalOrders})
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/pendingorders">
                        Pending Orders ({pendingCount})
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/approvedorders">
                        Approved Orders ({approvedCount})
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/intransitorders">
                        In Transit Orders ({intransitCount})
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/deliveredorders">
                        Delivered Orders ({deliveredCount})
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/returnedorders">
                        Returned Orders ({returnedCount})
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/cancelledorders">
                        Cancelled Orders ({cancelledCount})
                      </Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>
          </RequirePermission>
          <RequirePermission permission="incomplete_orders" fallback={true}>
            <li className="flex items-center space-x-2 p-2 rounded-md cursor-pointer">
              <Link
                to="/admin/incomplete-order"
                className={"flex items-center gap-2"}
              >
                <FaClipboardList /> <span>Incomplete Order</span>
              </Link>
            </li>
          </RequirePermission>
          <RequirePermission
            permission={["bkash_api", "steadfast_api"]}
            match="any"
            fallback={true}
          >
            <li className="space-x-2 px-2 rounded-md cursor-pointer">
              <Accordion
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  width: "100%",
                }}
                sx={{
                  color: "white", // Ensures text color is white
                  "& .MuiAccordionSummary-root": {
                    backgroundColor: "transparent",
                    minHeight: "auto", // Removes unnecessary padding
                    padding: "0", // Removes default padding
                  },
                  "& .MuiAccordionDetails-root": {
                    backgroundColor: "transparent",
                    paddingLeft: "0", // Ensures no extra left padding
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white", // Ensures the dropdown icon is white
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="p-2 flex items-center"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <FaCreditCard /> <span>Gateway & API</span>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className={"space-y-2 pl-4"}>
                    <RequirePermission permission="bkash_api" fallback={true}>
                      <li>
                        <Link
                          to="/admin/bkash-config"
                          className={"flex items-center gap-2"}
                        >
                          <span>bKash</span>
                        </Link>
                      </li>
                    </RequirePermission>

                    <RequirePermission
                      permission="steadfast_api"
                      fallback={true}
                    >
                      <li>
                        <Link
                          to="/admin/steadfast-config"
                          className={"flex items-center gap-2"}
                        >
                          <span>Steadfast</span>
                        </Link>
                      </li>
                    </RequirePermission>
                    <RequirePermission permission="pathao_api" fallback={true}>
                      <li>
                        <Link
                          to="/admin/pathao-config"
                          className={"flex items-center gap-2"}
                        >
                          <span>Pathao</span>
                        </Link>
                      </li>
                    </RequirePermission>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>
          </RequirePermission>
        </ul>
      </div>

      <div>
        <ul>
          {[
            {
              icon: <FaSlidersH />,
              label: "Sliders & Banners",
              to: "/admin/sliders-banners",
              permission: "sliders-banners",
            },
          ].map((item, index) => (
            <RequirePermission
              key={index}
              permission={item.permission}
              fallback={true}
            >
              <li className="flex items-center space-x-2 p-2 rounded-md cursor-pointer">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="flex items-center space-x-2 w-full"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <>
                    {item.icon}
                    <span>{item.label}</span>
                  </>
                )}
              </li>
            </RequirePermission>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {[
            {
              icon: <FaUserShield />,
              label: "System Users",
              path: "/admin/adminlist",
              permission: "admin-users", // 👈 Add permission key here
            },
          ].map((item, index) => (
            <RequirePermission
              key={index}
              permission={item.permission}
              fallback={true} // or a skeleton <li> if you want a loading placeholder
            >
              <li className="flex items-center space-x-2 p-2 rounded-md cursor-pointer">
                {item.icon}
                <Link to={item.path} className="text-inherit no-underline">
                  {item.label}
                </Link>
              </li>
            </RequirePermission>
          ))}
        </ul>
      </div>

      {/* Logout and Others */}
      <div>
        <ul>
          <li className="flex items-center space-x-2 p-2 rounded-md text-red-500 cursor-pointer">
            <button
              onClick={handleLogout}
              className={"flex items-center space-x-2 cursor-pointer"}
            >
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
