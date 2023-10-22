import { mongoose } from "mongoose";

const TicketsCollection = "Tickets";

const TicketsSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: new Date()
  },
  amount: Number,
  purcharser: String,
});
const TicketsModel = mongoose.model(TicketsCollection, TicketsSchema);
export default TicketsModel;
