import { User } from "./user.model.js";




const createUser = async (req, res) => {
  try {
      console.log("req.body", req.body);


    const userData = new User(req.body);
    const result = await userData.save();

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create User",
      error: error.message,
    });
  }
};


const getUser = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch User",
      error: error.message,
    });
  }
};


const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching User",
      error: error.message,
    });
  }
};


const update = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedData = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: updatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update User",
      error: error.message,
    });
  }
};


const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const UserController = {
  createUser,
  getUser,
  getSingleUser,
  update,
  remove,
};