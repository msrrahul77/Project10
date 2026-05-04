import Address from "./address.schema.js";


const createAddress = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const addressData = new Address(req.body);
    const result = await addressData.save();

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create address",
      error: error.message,
    });
  }
};


const getAddress = async (req, res) => {
  try {
    const data = await Address.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Address",
      error: error.message,
    });
  }
};


const getSingleAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Address.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching address",
      error: error.message,
    });
  }
};


const update = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedData = await Address.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ data: updatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update address",
      error: error.message,
    });
  }
};


const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await Address.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.status(200).json({
      message: "Address deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const AddressController = {
  createAddress,
  getAddress,
  getSingleAddress,
  update,
  remove,
};