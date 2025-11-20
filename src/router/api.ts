import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { AddressController } from "../controller/address-controller";

export const apiRuouter = express.Router();
apiRuouter.use(authMiddleware);

//? USER API
apiRuouter.get("/api/users/current", UserController.get);
apiRuouter.patch("/api/users/current", UserController.update);
apiRuouter.delete("/api/users/current", UserController.logout);

//? CONTACT API
apiRuouter.post("/api/contacts", ContactController.create);
apiRuouter.get("/api/contacts/:contactId", ContactController.get);
apiRuouter.put("/api/contacts/:contactId", ContactController.update);
apiRuouter.delete("/api/contacts/:contactId", ContactController.remove);
apiRuouter.get("/api/contacts", ContactController.search);

// ? ADDRESS API
apiRuouter.post("/api/contacts/:contactId/addresses", AddressController.create);
apiRuouter.get(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.get
);
