import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: String,
  message: String,
});

const MessageModel = mongoose.model("Mensajes", MessageSchema);

export default MessageModel;