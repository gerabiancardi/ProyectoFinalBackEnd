import { ServiceCart } from "../services/CartsServices.js";
import { Serviceproduct } from "../services/ProductServices.js";
import { ServiceSession } from "../services/SessionServices.js";
const renderProduct = (req, res) => {
  res.redirect("/products");
};

const getPaginateProducts = async (req, res) => {
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
        ? `http://localhost:8080/api/products?limit=${queryLimit}&page=${prevPage}`
        : null,
      nextLink: hasNextPage
        ? `http://localhost:8080/api/products?limit=${queryLimit}&page=${nextPage}`
        : null,
    };
    res.render("products", {
      response,
      last_name: req.session?.user?._doc.last_name,
      email: req.session?.user?._doc.email,
      age: req.session?.user?._doc.age,
      cartID: req.session?.user._doc.cartId
    });
  } catch (error) {
    req.logger.error(`Ocurrio un error en : ${req.originalUrl}`);
    res.send("Error");
    res.status(500).send({ error: "Error interno" });
  }
};

const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await ServiceCart.getCartById(id);
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }
    res.render("cart", { productos: cart.productos });
  } catch (error) {
    req.logger.error(`Ocurrio un error en : ${req.originalUrl}`);
    res.status(500).send("Error al obtener el carrito");
  }
};

const login = async (req, res) => {
  req.logger.error(`Ocurrio un error en : ${req.originalUrl}`)
  res.render("login");
};

const olvideClave = async (req, res) => {
  req.logger.error(`Ocurrio un error en : ${req.originalUrl}`)
  res.render("cambioDeClave");
};

const register = async (req, res) => {
  res.render("register");
};

const getProfile = async (req, res) => {
  console.log(req.session.user, "REQ.SESSION");
  const user = req.session.user;
  req.logger.info(`Informacion`);
  res.render("profile", {
    user,
    carrito: {
      carritoId: "carrito-1",
      productos: [{ productoId: "1", nombre: "camisa" }],
    },
  });
};

const renderUsers = async (req, res) => {
  const users= await ServiceSession.getUsers()
  res.render("users",{users});
};


export {
  login,
  getProfile,
  getCartById,
  getPaginateProducts,
  register,
  renderProduct,
  olvideClave, 
  renderUsers
};
