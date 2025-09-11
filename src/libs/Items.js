import mongoose from "mongoose";

const ItemsSchma = mongoose.Schema({
  ItemsIamge: {
    type: String,
  },
  Price: {
    type: String,
  },
  DiscountPrice: {
    type: String,
  },
  ItemsDescription: {
    type: String,
  },
  category: {
    type: String,
  },
  Size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

const ItemsModel =
  mongoose.models.AllItems || mongoose.model("AllItems", ItemsSchma);
export default ItemsModel;
