import { cartDao } from "../dao/CartDao.js";
import { productDao } from "../dao/ProductDao.js";

class CartSerivce {
  addCart = async (product) => {
    const newCart = await cartDao.addCart(product);
    console.log(newCart, "NEWCART")
    return newCart;
  };

  getCarts = async () => {
    const cartsArr = await cartDao.getCarts();
    return cartsArr;
  };

  getCartById = async (id) => {
    const cartDetail = await cartDao.getCartById(id);
    return cartDetail;
  };

  updateCart = async (cid, productId) => {
    const cart = await cartDao.getCartById(cid);

    if (!cart) {
      throw new Error("No existe el carrito");
    }

    const product = await productDao.getProductById(productId);

    if (!product) {
      throw new Error("No existe el producto");
    }

    const existProductInCart = cart.productos.some((productCart) => {
      return productCart.id?.toString() === product.id;
    });

    if (!existProductInCart) {
      await cartDao.updateCartWhenProductIsNotInCart(cid, productId);
      return this.getCartById(cid);
    }
    await cartDao.updateCartWhenProductIsInCart(cid, productId);
    return this.getCartById(cid);
  };

  DeleteProductInCart = async (cid, productId) => {
    const cart = await cartDao.findById(cid);

    if (!cart) {
      throw new Error("No existe el carrito");
    }

    const product = await cartDao.findById(productId);

    if (!product) {
      throw new Error("No existe el producto");
    }

    const existProductInCart = cart.productos.some(
      (productCart) => productCart.id?.toString() === product.id
    );

    if (!existProductInCart) {
      throw new Error("No existe el producto en el carrito");
    }

    return await cartDao.DeleteProductInCart(cid, productId);
  };

  addTicket = async (cid, user) => {
    const cart = await this.getCartById(cid);
    console.log(cart);
    if (cart.productos.length > 0) {
      let ticketamount = 0;
      let productswhitoutstock= []
      cart.productos.forEach(async (producto) => {
        const product = await productDao.getProductById(producto.id);
        const productbuy = producto.quantity;
        if (product.stock > productbuy) {
          ticketamount += product.price;
          await productDao.updateProduct(product.id, {
            stock: product.stock - productbuy,
          });
        }else{
         productswhitoutstock.push(product._id)
        }
      });
      const code = (Math.random() + 1).toString(36).substring(7);
      const newTicket = await cartDao.addTicket(ticketamount, user.email, code);
      return {newTicket, productswhitoutstock};
    }
  };
}

export const ServiceCart = new CartSerivce();
