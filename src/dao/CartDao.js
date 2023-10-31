import cartsModel from "./models/carts.models.js";
import productsModel from "./models/products.models.js";
import TicketsModel from "./models/tickets.models.js";

class CartDao {
  addCart = async (product) => {
    try {
      const newCart = await cartsModel.create(product);
      return newCart;
    } catch (error) {
      console.log(error);
    }
  };

  getCarts = async () => {
    try {
      const cartsArr = await cartsModel.find({});
      return cartsArr;
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (id) => {
    try {
      const cartDetail = await cartsModel
        .findById(id)
        .populate("productos.id")
        .lean();
      JSON.stringify(cartDetail);
      return cartDetail;
    } catch (error) {
      console.log(error);
    }
  };

  updateCartWhenProductIsNotInCart = async (cid, productId) => {
    try {
      return await cartsModel.updateOne(
        { _id: cid },
        {
          $push: {
            productos: { id: productId, quantity: 1 },
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  updateCartWhenProductIsInCart = async (cid, productId) => {
    try {
      return await cartsModel
      .updateOne(
        {
          _id: cid,
          "productos.id": productId,
        },
        { $inc: { "productos.$.quantity": 1 } }
      )
      .exec();
    } catch (error) {
      console.log(error)
    }
  };

  DeleteProductInCart = async (cid, productId) => {
    try {
      return await cartsModel
      .updateOne(
        {
          _id: cid,
          "productos.id": productId,
        },
        { $pull: { productos: { id: productId } } }
      )
      .exec();
    } catch (error) {
      console.log(error)
    }
  };

  addTicket = async (amount, email, code) => {
    try {
      const newTicket = await TicketsModel.create({
        amount,
        pucharser: email,
        code,
      });
      return newTicket;
    } catch (error) {
      console.log(error)
    }
  };

  vaciarCarrito = async (cid) => {
    try {
      const result = await cartsModel
      .updateOne({ _id: cid }, { $set: { productos: [] } })
      .exec();
    if (result.nModified > 0) {
      return "Todos los productos se han eliminado del carrito.";
    } else {
      return "Ningún producto se ha eliminado.";
    }
    } catch (error) {
      console.log(error)
    }
  };
}

export const cartDao = new CartDao();
