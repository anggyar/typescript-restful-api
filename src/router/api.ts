import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";

export const apiRuouter = express.Router();
apiRuouter.use(authMiddleware);

//? USER API
apiRuouter.get("/api/users/current", UserController.get);
apiRuouter.patch("/api/users/current", UserController.update);
apiRuouter.delete("/api/users/current", UserController.logout);

//? CONTACT API
apiRuouter.post("/api/contacts", ContactController.create);
