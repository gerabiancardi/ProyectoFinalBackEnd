import cartsModel from "./models/carts.models.js";
import TicketsModel from "./models/tickets.models.js";

class CartDao {
  addCart = async (product) => {
    try{
      const newCart = await cartsModel.create(product);
      return newCart;
    }catch(error){
      console.log(error)
    }
  };

  getCarts = async () => {
    const cartsArr = await cartsModel.find({});
    return cartsArr;
  };

  getCartById = async (id) => {
    const cartDetail = await cartsModel.findById(id).lean();
    return cartDetail;
  };

  updateCartWhenProductIsNotInCart = async (cid, productId) => {
    return await cartsModel.updateOne(
      { _id: cid },
      {
        $push: {
          productos: { id: productId, quantity: 1 },
        },
      }
    );
  };

  updateCartWhenProductIsInCart = async (cid, productId) => {
    return await cartsModel
      .updateOne(
        {
          _id: cid,
          "productos.id": productId,
        },
        { $inc: { "productos.$.quantity": 1 } }
      )
      .exec();
  };


  DeleteProductInCart = async (cid, productId) => {
    return await cartsModel
      .updateOne(
        {
          _id: cid,
          "productos.id": productId,
        },
        { $pull: { productos: { id: productId } } }
      )
      .exec();
  };

  addTicket = async (amount, email, code) => {
    const newTicket = await TicketsModel.create({amount, pucharser: email, code});
    return newTicket;
  };
}

export const cartDao = new CartDao();
