import mongoose from 'mongoose';

const collectionName = "Usuarios";

const roleType = {
  USER: "USER",
  ADMIN: "ADMIN",
  PUBLIC: "PUBLIC",
  PREMIUM: "PREMIUN"
}

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Carts"
  },
  role:{
    type:String,
    enum: Object.values(roleType),
    default: "USER",
  },
  lastLogin:{type:Date}
});

const userModel = mongoose.model(collectionName, userSchema);
export default userModel;