import employeModel from "../models/employesModel.js";

//Create employe
export const createEmploye = async (req, res) => {
  try {
    const employeData = new employeModel(req.body);
    await employeData.save();
    res.status(201).json({
      status: 201,
      statusText: "OK",
      messege: "employe data saved successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, statusText: "Error", messege: err.message });
  }
};

//Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employeesData = await employeModel.find();
    res.status(200).json(employeesData);
  } catch {
    res
      .status(500)
      .json({ status: 500, statusText: "Error", messege: err.message });
  }
};

//Update employee
export const updateEmployee = async (req, res) => {
  try {
    await employeModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      statusText: "OK",
      messege: "employe data updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, statusText: "Error", messege: err.message });
  }
};

//delete employee
export const deleteEmployee = async (req, res) => {
  try {
    await employeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 200,
      statusText: "OK",
      messege: "employe data deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, statusText: "Error", messege: err.message });
  }
};
