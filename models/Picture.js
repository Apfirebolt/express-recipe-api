import mongoose from "mongoose";

const pictureSchema = mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Recipe",
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Picture = mongoose.model("Picture", pictureSchema);

export default Picture;
