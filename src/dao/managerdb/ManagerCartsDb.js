import cartsModel from "../models/carts.models.js";
import productsModel from "../models/products.models.js";

class CartManager {
  addCart = async (product) => {
    const newCart = await cartsModel.create(product);
    return newCart;
  };

  getCarts = async () => {
    const cartsArr = await cartsModel.find({});
    return cartsArr;
  };

  getCartById = async (id) => {
    const cartDetail = await cartsModel.findById(id).lean();
    return cartDetail;
  };

  updateCart = async (cid, productId) => {
    const cart = await cartsModel.findById(cid);

    if (!cart) {
      throw new Error("No existe el carrito");
    }

    const product = await productsModel.findById(productId);

    if (!product) {
      throw new Error("No existe el producto");
    }

    const existProductInCart = cart.productos.some((productCart) => {
      return productCart.id?.toString() === product.id;
    });

    if (!existProductInCart) {
      await cartsModel.updateOne(
        { _id: cid },
        {
          $push: {
            productos: { id: productId, quantity: 1 },
          },
        }
      );

      return this.getCartById(cid);
    }

    await cartsModel
      .updateOne(
        {
          _id: cid,
          "productos.id": productId,
        },
        { $inc: { "productos.$.quantity": 1 } }
      )
      .exec();

    return this.getCartById(cid);
  };

  DeleteProductInCart = async (cid, productId) => {
    const cart = await cartsModel.findById(cid);

    if (!cart) {
      throw new Error("No existe el carrito");
    }

    const product = await productsModel.findById(productId);

    if (!product) {
      throw new Error("No existe el producto");
    }

    const existProductInCart = cart.productos.some(
      (productCart) => productCart.id?.toString() === product.id
    );

    if (!existProductInCart) {
      throw new Error("No existe el producto en el carrito");
    }

return await cartsModel
      .updateOne(
        {
          _id: cid,
          "productos.id": productId,
        },
        { $pull:{ productos: { id: productId }} }
      )
      .exec();
  };
}

export const managerCart = new CartManager();
