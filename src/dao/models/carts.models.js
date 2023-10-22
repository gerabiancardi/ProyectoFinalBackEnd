import mongoose from "mongoose";

const CartsCollection = "Carts";

const ProductsCartsSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  quantity: {
    type: Number,
  },
});

const CartsSchema = new mongoose.Schema({
  productos: { type: [ProductsCartsSchema], required: false, default: [] },
});

const CartsModel = mongoose.model(CartsCollection, CartsSchema);
export default CartsModel;
