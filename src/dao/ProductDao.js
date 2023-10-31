import productsModel from "./models/products.models.js";

class ProductDao {
  addProduct = async (product) => {
    try {
      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error)
    }
  };

  getProducts = async () => {
    try {
      return await productsModel.find().lean();
    } catch (error) {
      console.log(error)
    }
  };

  getPaginateProducts = async ({ limit, page, sort, query }) => {
    try {
      const data =await productsModel.paginate({},{ limit, page, sort:sort, lean: true})
      return data;
    } catch (error) {
      console.log(error)
    }
  };

  getProductById = async (id) => {
    try {
      const productDetail = await productsModel.findById(id).lean();
      return productDetail;
    } catch (error) {
      console.log(error)
    }
  };

  getProductByCode = async (code) => {
    try {
      return await productsModel.findOne({
        code
      });
    } catch (error) {
      console.log(error)
    }
  };

  updateProduct = async (id, props) => {
    try {
      return await productsModel.findByIdAndUpdate(id, props);
    } catch (error) {
      console.log(error)
    }
  };

  updateProductStock = async (id) => {
    try {
      await productsModel.findByIdAndUpdate(
        id,
        { $inc: { stock: -1 } },
      )
    } catch (error) {
      console.log(error)
    }
  };

  deleteProduct = async (id) => {
    try {
      return await productsModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error)
    }
  };
}

export const productDao = new ProductDao();