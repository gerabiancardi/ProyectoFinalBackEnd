import MessageModelModel from "../models/messages.models.js";

class MessageManager {
  addMessage = async (message) => {
    try {
      const newMessage = await MessageModelModel.create(message);
      return newMessage;
    } catch (error) {
      console.log("error al crear producto", error);
    }
  };

  getMessage = async () => {
    try {
      const messagessArr = await MessageModelModel.find({});
      return messagessArr;
    } catch (error) {
      console.log("No se encontraron productos", error);
    }
  };
}

export const managermessage = new MessageManager();
