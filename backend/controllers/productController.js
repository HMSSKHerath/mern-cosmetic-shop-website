import Product from "../models/productModel.js";
import { isAdmin } from "../controllers/userController.js";

async function createProduct(req,res)
{
    if(!isAdmin(req))
    {
        return res.status(403).json({ message: "Forbidden: You do not have permission to create a product" });
    }

    try
    {
        const productData = req.body;

        const newProduct = new Product(productData);

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully"});
    }
    catch(error)
    {
        res.status(500).json({ message: "Error creating product" , error: error.message });
    }
}

async function getAllProducts(req,res)
{
    try
    {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(error)
    {
        res.status(500).json({ message: "Error fetching products" , error: error.message });
    }
}

export { createProduct , getAllProducts };