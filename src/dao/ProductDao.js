import productsModel from "./models/products.models.js";

class ProductDao {
  addProduct = async (product) => {
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

  getProductByCode = async (code) => {
   return await productsModel.findOne({
      code
    });
  };

  updateProduct = async (id, props) => {
    return await productsModel.findByIdAndUpdate(id, props);
  };

  deleteProduct = async (id) => {
   return await productsModel.findByIdAndDelete(id);
  };
}

export const productDao = new ProductDao();