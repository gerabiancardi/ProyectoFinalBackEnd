import { cartDao } from "../dao/CartDao.js";
import { productDao } from "../dao/ProductDao.js";

class CartSerivce {
  addCart = async (product) => {
    const newCart = await cartDao.addCart(product);
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
      return productCart.id._id?.toString() == product._id;
    });

    if (!existProductInCart) {
      await cartDao.updateCartWhenProductIsNotInCart(cid, productId);
      await productDao.updateProductStock(productId);
      return cart;
    }
    await cartDao.updateCartWhenProductIsInCart(cid, productId);
    await productDao.updateProductStock(productId);
    return cart;
  };

  DeleteProductInCart = async (cid, productId) => {
    const cart = await cartDao.getCartById(cid);

    if (!cart) {
      throw new Error("No existe el carrito");
    }

    const product = await productDao.getProductById(productId);

    if (!product) {
      throw new Error("No existe el producto");
    }

    const existProductInCart = cart.productos.some((productCart) => {
      return productCart.id._id?.toString() == product._id;
    });

    if (!existProductInCart) {
      throw new Error("No existe el producto en el carrito");
    }

    return await cartDao.DeleteProductInCart(cid, productId);
  };

  addTicket = async (cid, user) => {
    const cart = await this.getCartById(cid);
    if (cart.productos.length > 0) {
      let ticketamount = 0;
      let productswhitoutstock = [];
      cart.productos.forEach(async (producto) => {
        const product = await productDao.getProductById(producto.id);
        const productbuy = producto.quantity;
        if (product.stock > productbuy) {
          ticketamount += product.price;
          await productDao.updateProduct(product.id, {
            stock: product.stock - productbuy,
          });
        } else {
          productswhitoutstock.push(product._id);
        }
      });
      const code = (Math.random() + 1).toString(36).substring(7);
      const newTicket = await cartDao.addTicket(ticketamount, user.email, code);
      return { newTicket, productswhitoutstock };
    }
  };

  vaciarCarrito = async (cid) => {
    const result = await cartDao.vaciarCarrito(cid);
    return result;
  };
}

export const ServiceCart = new CartSerivce();
