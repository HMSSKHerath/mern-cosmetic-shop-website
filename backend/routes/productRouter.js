import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import verifyAdminRole from "../middlewares/roleMiddleware.js";
import {getAllProducts , getProductById , createProduct , deleteProduct , updateProduct} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProductById);

productRouter.post("/", authMiddleware, verifyAdminRole, createProduct);
productRouter.delete("/:productId", authMiddleware, verifyAdminRole, deleteProduct);
productRouter.put("/:productId", authMiddleware, verifyAdminRole, updateProduct);

export default productRouter; 