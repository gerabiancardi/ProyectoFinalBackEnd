import { Router } from "express";
import authMdw from "../../middleware/auth.middleware.js"
import { handlePolicies } from "../../middleware/handpolicies.middleware.js";
import { getCartById, getPaginateProducts, getProfile, login, olvideClave, register, renderProduct, renderUsers } from "../../controller/ViewsRouterContoler.js";
const router =Router();

router.get("/",[authMdw, handlePolicies(["USER"])],renderProduct)

router.get("/products",authMdw, getPaginateProducts);

router.get('/carts/:id',getCartById);

router.get("/login", login);

router.get("/cambioClave", olvideClave);

router.get("/formularioNuevaClave", (req,res)=>res.render("nuevaClave"));

router.get("/register", register);

router.get("/profile", authMdw, getProfile);

router.get("/users",[authMdw, handlePolicies(["ADMIN"])], renderUsers)

router.get("/compraExitosa", (req,res)=>{res.render("compraFinalizada")})

router.get("/loggerTest", (req,res)=>{
    req.logger.debug(`Test Logger Debug`)
    req.logger.http(`Test Logger Http`)
    req.logger.info(`Test Logger Info`)
    req.logger.warning(`Test Logger warning`)
    req.logger.error(`Test Logger Error`)
    req.logger.fatal(`Test Logger Fatal`)
    res.send("TEST LOGGERS")
});

export default router;