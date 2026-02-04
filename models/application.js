const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    position: { type: String, required: true }, 
    company: { type: String, required: true },
    status: { type: String, enum: ["applied", "interviewing", "offered", "rejected"], default: "applied" }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Application", applicationSchema);
