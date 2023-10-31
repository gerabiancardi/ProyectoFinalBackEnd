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
    const cartsArr = await cartsModel.find({});
    return cartsArr;
  };

  getCartById = async (id) => {
    try {
      const cartDetail = await cartsModel.findById(id).lean();
      let productos = [];
      for (let index = 0; index < cartDetail.productos.length; index++) {
        let producto = await productsModel.findById(
          cartDetail.productos[index].id
        );
        console.log(cartDetail.productos[index].id)
        if (producto) {
          productos.push({
            ...producto,
            quantity: cartDetail.productos[index].quantity,
          });
        }
      }
      return { ...cartDetail, productos };
    } catch (error) {
      console.log(error);
    }
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
    const newTicket = await TicketsModel.create({
      amount,
      pucharser: email,
      code,
    });
    return newTicket;
  };

  vaciarCarrito = async (cid) => {
    const result = await cartsModel
      .updateOne({ _id: cid }, { $set: { productos: [] } })
      .exec();
    if (result.nModified > 0) {
      return "Todos los productos se han eliminado del carrito.";
    } else {
      return "Ningún producto se ha eliminado.";
    }
  };
}

export const cartDao = new CartDao();
