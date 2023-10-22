import productsModel from "../models/products.models.js";

class ProductManager {
  addProduct = async (product) => {
    const productDetail = await productsModel.findOne({
      code: product.code,
    });
    if (productDetail) {
      throw new Error("Code should be different")
    }
    const newProduct = await productsModel.create(product);
    return newProduct;
  };

  getProducts = async () => {
    return await productsModel.find().lean();
  };

  getPaginateProducts = async ({ limit, page, sort, query }) => {
    const data =await productsModel.paginate({},{ limit, page, sort:sort, lean: true})
    return data;
  };

  getProductById = async (id) => {
    const productDetail = await productsModel.findById(id).lean();
    return productDetail;
  };

  updateProduct = async (id, props) => {
    const productDetail = await productsModel.findOne({
      code: product.code,
    });
    if (productDetail && Object.keys(productDetail).length !== 0) {
      throw new Error("Code should be different");
    }
    await productsModel.findByIdAndUpdate(id, props);
    return { response: "Producto actualizado correctamente", code: 200 };
  };

  deleteProduct = async (id) => {
    await productsModel.findByIdAndDelete(id);
    return { response: "Producto eliminado correctamente", code: 200 };
  };
}

export const managerproduct = new ProductManager();