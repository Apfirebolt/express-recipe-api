import mongoose from "mongoose";

const stepSchema = mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Recipe",
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Step = mongoose.model("Step", stepSchema);

export default Step;
