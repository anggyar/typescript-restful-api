import express from "express";
import { publicRouter } from "../router/public-api";
import { errorMidlleware } from "../middleware/error-middleware";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(errorMidlleware);
