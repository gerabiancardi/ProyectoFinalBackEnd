import { ServiceCart } from "../services/CartsServices.js";
import { Serviceproduct } from "../services/ProductServices.js";
import { ServiceSession } from "../services/SessionServices.js";
const renderProduct = (req, res) => {
  res.redirect("/products");
};

const getPaginateProducts = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  try {
    const { limit, page, sort, ...query } = req.query;

    const queryLimit = limit ? Number(limit) : 10;

    const {
      docs: products,
      totalPages,
      prevPage,
      nextPage,
      page: productsPage,
      hasPrevPage,
      hasNextPage,
    } = await Serviceproduct.getPaginateProducts({
      limit: queryLimit,
      page: page ? Number(page) : 1,
      sort: sort ? { price: sort } : undefined,
      query: query ? query : undefined,
    });
    const response = {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: productsPage,
      prevPage,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage
        ? `${API_URL}/api/products?limit=${queryLimit}&page=${prevPage}`
        : null,
      nextLink: hasNextPage
        ? `${API_URL}/api/products?limit=${queryLimit}&page=${nextPage}`
        : null,
    };
    res.render("products", {
      response,
      last_name: req.session?.user?._doc.last_name,
      email: req.session?.user?._doc.email,
      age: req.session?.user?._doc.age,
      cartID: req.session?.user._doc.cartId,
    });
  } catch (error) {
    req.logger.error(`Ocurrio un error en : ${req.originalUrl}`);
    res.send("Error");
    res.status(500).send({ error: "Error interno" });
  }
};

const getCartById = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  const { id } = req.params;
  try {
    const cart = await ServiceCart.getCartById(id);
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }
    const productos = cart.productos.map(p => ({ ...p.id, quantity: p.quantity }));
    let totalPrecio = 0;
    productos.forEach(producto => totalPrecio += producto.price);
    res.render("cart", { productos, id, totalPrice: totalPrecio || 0 });
  } catch (error) {
    req.logger.error(`Ocurrió un error en: ${req.originalUrl}`);
    res.status(500).send("Error al obtener el carrito");
  }
};

const login = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  req.logger.error(`Ocurrio un error en : ${req.originalUrl}`);
  res.render("login");
};

const olvideClave = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  req.logger.error(`Ocurrio un error en : ${req.originalUrl}`);
  res.render("cambioDeClave");
};

const register = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  res.render("register");
};

const getProfile = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  const user = req.session.user;
  res.render("profile", {
    user,
    carrito: {
      carritoId: "carrito-1",
      productos: [{ productoId: "1", nombre: "camisa" }],
    },
  });
};

const renderUsers = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  const users = await ServiceSession.getUsers();
  res.render("users", { users });
};

const finalizarCompra = async (req, res) => {
  req.logger.info("Ejectuando endpoint" + req.originalUrl)
  const cid = req.params.cid;
  await ServiceCart.vaciarCarrito(cid);
  res.render("compraFinalizada");
};

export {
  login,
  getProfile,
  getCartById,
  getPaginateProducts,
  register,
  renderProduct,
  olvideClave,
  renderUsers,
  finalizarCompra,
};
