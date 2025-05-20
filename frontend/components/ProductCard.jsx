import React, {useState} from "react";
import {FaEdit} from "react-icons/fa";
import {RiDeleteBin5Fill} from "react-icons/ri";
import {useProductStore} from "../store/product";
import toast from "react-hot-toast";

const ProductCard = ({product}) => {
	const {deleteProduct, updateProduct} = useProductStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editedProduct, setEditedProduct] = useState({
		name: product.name,
		price: product.price,
		image: product.image,
	});

	const handleDeleteProduct = async (pid) => {
		let {success, message} = await deleteProduct(pid);
		if (!success) {
			toast.error(message);
		} else {
			toast.success(message);
		}
	};

	// const handleUpdateProduct = async (pid, editedProduct) => {
	// 	let {success, message} = await updateProduct(pid, editedProduct);
	// 	setIsModalOpen(false);

	// 	if (!success) {
	// 		toast.error(message);
	// 	} else {
	// 		toast.success(message);
	// 	}
	// };

	const handleSaveEdit = async () => {
		const {success, message} = await updateProduct(product._id, editedProduct);

		if (success) {
			toast.success(message || "Product updated successfully");
			setIsModalOpen(false);
		} else {
			toast.error(message || "Failed to update product");
		}
	};

	return (
		<>
			<div className="w-80 border rounded-xl shadow-md hover:shadow-lg transition bg-white overflow-hidden">
				<img
					src={product.image}
					alt={product.name}
					className="w-full h-44 object-cover"
				/>

				<div className="p-4 flex flex-col gap-2">
					<h2 className="text-lg font-semibold text-gray-800">
						{product.name}
					</h2>
					<p className="text-gray-500 font-semibold">$ {product.price}</p>

					<div className="flex gap-3 mt-2">
						<button
							onClick={() => {
								setIsModalOpen(true);
							}}
							className="p-2 bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold rounded">
							<FaEdit />
						</button>
						<button
							onClick={() => handleDeleteProduct(product._id)}
							className="p-2 bg-red-400 hover:bg-red-500 text-white text-sm font-semibold rounded">
							<RiDeleteBin5Fill />
						</button>
					</div>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-md shadow-lg w-96">
						<h2 className="text-xl font-bold mb-4 text-center text-gray-700">
							Edit Product
						</h2>

						<div className="flex flex-col gap-3">
							<input
								type="text"
								name="name"
								value={editedProduct.name}
								onChange={(e) =>
									setEditedProduct({...editedProduct, name: e.target.value})
								}
								placeholder="Product Name"
								className="border p-2 rounded"
							/>
							<input
								type="text"
								name="price"
								value={editedProduct.price}
								onChange={(e) =>
									setEditedProduct({...editedProduct, price: e.target.value})
								}
								placeholder="Price"
								className="border p-2 rounded"
							/>
							<input
								type="text"
								name="image"
								value={editedProduct.image}
								onChange={(e) =>
									setEditedProduct({...editedProduct, image: e.target.value})
								}
								placeholder="Image URL"
								className="border p-2 rounded"
							/>

							<div className="flex justify-end gap-2 mt-4">
								<button
									onClick={() => setIsModalOpen(false)}
									className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
									Cancel
								</button>
								<button
									onClick={handleSaveEdit}
									className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductCard;
