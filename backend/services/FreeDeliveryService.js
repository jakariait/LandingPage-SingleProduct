const FreeDeliveryAmount = require("../models/FreeDeliveryAmount");

const getAmount = async () => {
  try {
    let doc = await FreeDeliveryAmount.findOne();
    if (!doc) {
      doc = await FreeDeliveryAmount.create({ value: 0 });
    }
    return doc;
  } catch (error) {
    throw new Error("Failed to fetch free delivery amount.");
  }
};

const updateAmount = async (newValue, newFreeDeliveryEndTime) => {
  try {
    let doc = await FreeDeliveryAmount.findOne();
    if (!doc) {
      doc = await FreeDeliveryAmount.create({ value: newValue, freeDeliveryEndTime: newFreeDeliveryEndTime });
    } else {
      doc.value = newValue;
      doc.freeDeliveryEndTime = newFreeDeliveryEndTime;
      await doc.save();
    }
    return doc;
  } catch (error) {
    throw new Error("Failed to update free delivery amount.");
  }
};

module.exports = {
  getAmount,
  updateAmount,
};
