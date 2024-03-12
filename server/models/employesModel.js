import mongoose from "mongoose";

const employeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    post: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const employeModel = mongoose.model("employe", employeSchema);
export default employeModel;
