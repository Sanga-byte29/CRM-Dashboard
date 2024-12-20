const Logistics = require("../Models/logistics");

// Create a new logistics entry
exports.createLogistics = async (req, res) => {
  try {
    const {
      orderId,
      itemsDispatched,
      materialDispatchedDate,
      courierPartnerDetails,
      docketNumber,
      paymentType,
      amount,
    } = req.body;

    const newLogistics = new Logistics({
      orderId,
      itemsDispatched,
      materialDispatchedDate,
      courierPartnerDetails,
      docketNumber,
      paymentType,
      amount,
    });

    const savedLogistics = await newLogistics.save();
    res.status(201).json(savedLogistics);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating logistics entry", error: err.message });
  }
};

// Get all logistics entries
exports.getAllLogistics = async (req, res) => {
  try {
    const logistics = await Logistics.find().populate("orderId");
    res.status(200).json(logistics);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching logistics entries",
      error: err.message,
    });
  }
};

// Get a specific logistics entry by ID
exports.getLogisticsById = async (req, res) => {
  try {
    const { id } = req.params;
    const logistics = await Logistics.findById(id).populate("orderId");

    if (!logistics) {
      return res.status(404).json({ message: "Logistics entry not found" });
    }

    res.status(200).json(logistics);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching logistics entry", error: err.message });
  }
};

// Update a specific logistics entry by ID
exports.updateLogistics = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      orderId,
      itemsDispatched,
      materialDispatchedDate,
      courierPartnerDetails,
      docketNumber,
      paymentType,
      amount,
    } = req.body;

    const updatedLogistics = await Logistics.findByIdAndUpdate(
      id,
      {
        orderId,
        itemsDispatched,
        materialDispatchedDate,
        courierPartnerDetails,
        docketNumber,
        paymentType,
        amount,
      },
      { new: true, runValidators: true }
    );

    if (!updatedLogistics) {
      return res.status(404).json({ message: "Logistics entry not found" });
    }

    res.status(200).json(updatedLogistics);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating logistics entry", error: err.message });
  }
};

// Delete a specific logistics entry by ID
exports.deleteLogistics = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLogistics = await Logistics.findByIdAndDelete(id);

    if (!deletedLogistics) {
      return res.status(404).json({ message: "Logistics entry not found" });
    }

    res.status(200).json({
      message: "Logistics entry deleted successfully",
      deletedLogistics,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting logistics entry", error: err.message });
  }
};
