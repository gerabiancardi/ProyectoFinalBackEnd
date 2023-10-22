import { Router } from "express";
import { cambiarRol, getUsers,deleteUsers, deleteUsersById  } from "../controller/SessionController.js";
import authMdw from "../middleware/auth.middleware.js";
import { handlePolicies } from "../middleware/handpolicies.middleware.js";

const router = Router();

router.get("/",getUsers);

router.delete("/",deleteUsers);

router.post("/:uid",[authMdw,handlePolicies(["ADMIN"])],deleteUsersById) 

router.post("/:role/:iud",[authMdw, handlePolicies(["ADMIN"])], cambiarRol);


export{ router as userRouter }