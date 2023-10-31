import { HttpResponse } from "../middleware/errores.js";
import { ServiceCart } from "../services/CartsServices.js";

const httpErrors = new HttpResponse();

const getCarts = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  try {
    const response = await ServiceCart.getCarts();
    if (response) {
      return res.send(response);
    }
    return httpErrors.NotFound(res, "Carrito no Encontrado");
  } catch {
    return httpErrors.Error(res, "Ocurrio un error inesperado");
  }
};

const getCartById = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  try {
    const cid = req.params.cid;
    const response = await ServiceCart.getCartById(cid);
    if (response) {
      return res.send(response);
    }
    throw httpErrors.NotFound(res, "Carrito no Encontrado");
  } catch {
    return httpErrors.Error(res, "Ocurrio un error inesperado");
  }
};

const addCart = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  try {
    const products = req.body;
    const response = await ServiceCart.addCart(products);
    res.status(201).json(response);
  } catch {
    return httpErrors.Error(res, "Ocurrio un error inesperado");
  }
};

const updateCart = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  try {
    const cid = req.params.cid;
    const productoId = req.params.pid;
    const response = await ServiceCart.updateCart(cid, productoId);
    res.redirect("/products");
  } catch (error) {
    console.log(error);
    return httpErrors.Error(res, "Ocurrio un error inesperado");
  }
};

const deleteProductInCart = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  try {
    const cid = req.params.cid;
    const productoId = req.params.pid;
    const response = await ServiceCart.DeleteProductInCart(cid, productoId);
    res.redirect("/carts/" + cid);
  } catch (error) {
    return httpErrors.Error(res, "Ocurrio un error inesperado");
  }
};

const addTicket = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  try {
    const cid = req.params.cid;
    const user = req.session.user;
    const response = await ServiceCart.addTicket(cid, user);
    res.json(response);
  } catch (error) {
    return httpErrors.Error(res, "Ocurrio un error inesperado");
  }
};

const vaciarCarrito = async (cid) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  const result = await ServiceCart.vaciarCarrito(cid);
  return result;
};

export {
  getCarts,
  getCartById,
  addCart,
  updateCart,
  deleteProductInCart,
  addTicket,
  vaciarCarrito,
};
