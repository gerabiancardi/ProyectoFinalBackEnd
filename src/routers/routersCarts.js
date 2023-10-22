import { Router } from "express";
import { addCart, deleteProductInCart, getCartById, getCarts, updateCart, addTicket } from "../controller/CartsController.js";
import authMdw from "../middleware/auth.middleware.js"
import { handlePolicies } from "../middleware/handpolicies.middleware.js";

const router = Router();

router.get("/",[handlePolicies(["PUBLIC"])], getCarts);

router.get("/:cid",[handlePolicies(["PUBLIC"])], getCartById);

router.post("/",[authMdw, handlePolicies(["USER"])], addCart);

router.post("/:cid/products/:pid",/*[authMdw, handlePolicies(["USER"])],*/ updateCart); 

router.delete("/:cid/products/:pid",[authMdw, handlePolicies(["USER"])], deleteProductInCart); 

router.get("/:cid/purchase",[authMdw, handlePolicies(["USER"])], addTicket);

export { router as cartsRouter };
