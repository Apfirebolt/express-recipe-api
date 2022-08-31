import mongoose from "mongoose";

const pictureSchema = mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Recipe",
    },
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ingredient",
    },
    title: {
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
