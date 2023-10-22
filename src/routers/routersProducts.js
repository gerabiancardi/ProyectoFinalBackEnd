import { Router } from "express";
import {addProduct, deleteProduct, getPaginateProducts, getProductById, updateProduct} from "../controller/ProductsController.js"
import authMdw from "../middleware/auth.middleware.js"
import { handlePolicies } from "../middleware/handpolicies.middleware.js";
const router = Router();

router.get("/",[handlePolicies(["PUBLIC"])], getPaginateProducts);

router.get("/:pid",[handlePolicies(["PUBLIC"])], getProductById);

router.post("/",[authMdw, handlePolicies(["ADMIN", "PREMIUM"])],addProduct)

router.put("/:pid",[authMdw, handlePolicies(["ADMIN", "PREMIUM"])],updateProduct)

router.post("/:pid",/*[authMdw,handlePolicies(["ADMIN", "PREMIUM"])],*/deleteProduct) 


export {router as productsRouter}