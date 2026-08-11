import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IIngredient extends Document {
  recipe: Types.ObjectId;
  name: string;
  quantity?: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define Schema with typed interface
const ingredientSchema = new Schema<IIngredient>(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Recipe",
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Export Typed Model
const Ingredient: Model<IIngredient> = mongoose.model<IIngredient>(
  "Ingredient",
  ingredientSchema
);

export default Ingredient;