import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

export const apiRuouter = express.Router();
apiRuouter.use(authMiddleware);

//? USER API
apiRuouter.get("/api/users/current", UserController.get);
apiRuouter.patch("/api/users/current", UserController.update);
