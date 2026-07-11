import Product from "../models/productModel.js";

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
        console.error(error);
        res.status(500).json({ message: "Error creating product" });
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
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

async function getProductById(req,res)
{
    try
    {
        const productId = req.params.productId;
        const product = await Product.findOne({ productId: productId });

        if(!product)
        {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: "Error fetching product" });
    }
}

async function deleteProduct(req,res)
{
    if(!isAdmin(req))
    {
        return res.status(403).json({ message: "Forbidden: You do not have permission to delete a product" });
    }

    try
    {
        const productId = req.params.productId;

        await Product.deleteOne({ productId: productId });
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: "Error deleting product"});
    }
}

async function updateProduct(req,res)
{
    if(!isAdmin(req))
    {
        return res.status(403).json({ message: "Forbidden: You do not have permission to update a product" });
    }

    try
    {
        const productId = req.params.productId;
        const updatedData = req.body;

        await Product.updateOne({ productId: productId }, updatedData);
        res.status(200).json({ message: "Product updated successfully" });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    }
}

export { createProduct , getAllProducts , getProductById , deleteProduct , updateProduct };