import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
	try {
		const allProducts = await Product.find({});
		res.status(200).json({success: true, data: allProducts});
	} catch (error) {
		console.log("Error in fetching products", error.message);
		res.status(500).json({success: false, message: "server error"});
	}
};

export const createProducts = async (req, res) => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		return res
			.status(400)
			.json({success: false, message: "Please provide all fields"});
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({success: true, data: newProduct});
	} catch (error) {
		console.log("Error in create product: ", error.message);
		res.status(500).json({success: false, message: "server error"});
	}
};

export const deleteProduct = async (req, res) => {
	const {id} = req.params;
	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({success: true, message: "Product deleted"});
	} catch (error) {
		res.status(500).json({success: false, message: "product not found"});
	}
};

export const updateProduct = async (req, res) => {
	const {id} = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({success: false, message: "Invalid product id"});
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true,
		});
		res.status(200).json({success: true, data: updatedProduct});
	} catch (error) {
		console.log("Error in updating the product", error.message);
		res.status(500).json({success: false, message: "product not found"});
	}
};
