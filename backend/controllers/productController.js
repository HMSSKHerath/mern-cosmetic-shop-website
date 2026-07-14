import Product from "../models/productModel.js";

async function createProduct(req,res)
{
    try
    {
        const { productId, name, altNames, description, price, labelPrice, category } = req.body;

        const newProduct = new Product({
            productId,
            name,
            altNames,
            description,
            price,
            labelPrice,
            category
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully"});
    }
    catch(error)
    {
        if(error.code === 11000)
        {
            return res.status(409).json({ message: "Product with this ID already exists" });
        }

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
        const { productId } = req.params;
        const product = await Product.findOne({ productId });

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
    try
    {
        const { productId } = req.params;

        const existingProduct = await Product.findOne({ productId});

        if(!existingProduct)
        {
            return res.status(404).json({ message: "Product not found" });
        }

        await Product.deleteOne({ productId });
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
    try
    {
        const { productId } = req.params;
        const { name, altNames, description, price, labelPrice, category } = req.body;

        const existingProduct = await Product.findOne({ productId });

        if(!existingProduct)
        {
            return res.status(404).json({ message: "Product not found" });
        }

        await Product.updateOne(
            { productId }, 
            { name, altNames, description, price, labelPrice, category }
        );

        res.status(200).json({ message: "Product updated successfully" });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    }
}

export { createProduct , getAllProducts , getProductById , deleteProduct , updateProduct };