import express from "express";
import {getAllProducts , createProduct , deleteProduct} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);
productRouter.delete("/", deleteProduct);

export default productRouter; 