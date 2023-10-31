import { Router } from "express";
import { cambiarRol,deleteUsers, deleteUsersById  } from "../controller/SessionController.js";
import authMdw from "../middleware/auth.middleware.js";
import { handlePolicies } from "../middleware/handpolicies.middleware.js";
import { renderUsers } from "../controller/ViewsRouterContoler.js";

const router = Router();

router.get("/",[authMdw, handlePolicies(["PREMIUN", "ADMIN"])], renderUsers);

router.delete("/",deleteUsers);

router.post("/:uid",[authMdw,handlePolicies(["ADMIN"])],deleteUsersById) 

router.post("/:role/:iud",[authMdw, handlePolicies(["ADMIN"])], cambiarRol);


export{ router as userRouter }