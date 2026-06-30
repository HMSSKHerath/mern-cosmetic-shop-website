import express from "express";
import {getAllProducts , createProduct} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);

export default productRouter;