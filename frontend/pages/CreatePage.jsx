import React from "react";
import {useState} from "react";
import {useProductStore} from "../store/product";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

	const {createProduct} = useProductStore();

	const handleAddProduct = async () => {
		const {success, message} = await createProduct(newProduct);
		// console.log("success", success);
		// console.log("Message: ", message);
	};

	return (
		<div className="outer-container flex justify-center items-center w-screen h-[500px]">
			<div className="inner-container flex gap-2 flex-col w-[50%] bg-gray-100 px-5 py-9 rounded-sm">
				<h1 className="text-3xl mb-4">Create a new product</h1>
				<input
					className="border-2 border-gray-300 px-3 py-2 rounded-sm outline-none focus:border-blue-300"
					type="text"
					name="name"
					value={newProduct.name}
					placeholder="Product name"
					onChange={(e) => {
						setNewProduct({...newProduct, name: e.target.value});
					}}
				/>
				<input
					className="border-2 border-gray-300 px-3 py-2 rounded-sm outline-none focus:border-blue-300"
					type="number"
					name="price"
					placeholder="Product price"
					value={newProduct.price}
					onChange={(e) => {
						setNewProduct({...newProduct, price: e.target.value});
					}}
				/>
				<input
					className="border-2 border-gray-300 px-3 py-2 rounded-sm outline-none focus:border-blue-300"
					type="text"
					name="image"
					placeholder="Product image url"
					value={newProduct.image}
					onChange={(e) => {
						setNewProduct({...newProduct, image: e.target.value});
					}}
				/>
				<button
					onClick={handleAddProduct}
					className="bg-blue-400 px-3 py-2 rounded-sm text-white">
					Add Product
				</button>
			</div>
		</div>
	);
};

export default CreatePage;
