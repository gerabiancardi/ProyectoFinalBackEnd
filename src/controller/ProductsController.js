import { HttpResponse } from "../middleware/errores.js";
import { Serviceproduct } from "../services/ProductServices.js";

const httpErrors = new HttpResponse()

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
    return res.send(response);
  } catch (error) {
    return httpErrors.Error(res, "Ocurrio un error inesperado")
  }
};

const getProductById = async (req, res) => {
  try {
    const pid = (req.params.pid);
    const result = await Serviceproduct.getProductById(pid);
    if (!result) {
      return httpErrors.NotFound(res, "Producto no encontrado");
    }
    res.send({ result });
  } catch {
    return httpErrors.Error(res, "Ocurrio un error inesperado")
  }
};

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    console.log(product)
    if (Object.values(product).length == 0) {
      return httpErrors.BadRequest(res,"Debe completar todos los campos");
    }
    const response = await Serviceproduct.addProduct(product);
    return res.status(201).json(response);
  } catch (error) {
    console.log(error)
    return httpErrors.Error(res, "Ocurrio un error inesperado");
  }
};

const updateProduct = async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const props = req.body;
    const response = await Serviceproduct.updateProduct(pid, props);
    if (response) {
      res.status(response.code).json({ mensaje: response.response });
    }
    return httpErrors.NotFound(res, "Producto no encontrado");
  } catch {
    return httpErrors.Error(res, "Ocurrio un error inesperado")
  }
};

const deleteProduct = async (req, res) => {
  try {
    const pid = (req.params.pid);
    const response = await Serviceproduct.deleteProduct(pid);
    if (response) {
      return res.sendStatus(204);
    }
    return httpErrors.NotFound(res, "Producto no encontrado");
  } catch (error){
    console.log(error)
    return httpErrors.Error(res, "Ocurrio un error inesperado")
  }
};

export {
  deleteProduct,
  updateProduct,
  addProduct,
  getPaginateProducts,
  getProductById,
};
