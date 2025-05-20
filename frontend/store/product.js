import {create} from "zustand"; // Zustand is a state management library for React
import {toast} from "react-hot-toast"; // Import toast

export const useProductStore = create((set) => ({
	// useProductStore is a custom hook
	products: [],

	// Set all products
	setProducts: (products) => set({products}),

	// Create a new product
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			const message = "Please fill in all the fields";
			toast.error(message);
			return {success: false, message};
		}

		try {
			const res = await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Failed to create product");
			}

			set((state) => ({products: [...state.products, data.data]}));
			const message = "Product created successfully ✅";
			toast.success(message);
			return {success: true, message};
		} catch (error) {
			const message = error.message || "Something went wrong";
			toast.error(message);
			return {success: false, message};
		}
	},

	fetchProducts: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();

		set({products: data.data});
	},

	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();

		if (!data.success) {
			const message = data.message;
			toast.error(message);
			return {success: false, message};
		}

		// updating the UI, without refreshing
		set((state) => ({
			products: state.products.filter((product) => product._id !== pid),
		}));
		return {success: true, message: data.message};
	},

	updateProduct: async (pid, editedProduct) => {
		try {
			const res = await fetch(`/api/products/${pid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(editedProduct),
			});

			// Check if the response is not JSON (HTML error page)
			if (!res.ok) {
				const errorText = await res.text(); // Try parsing it as text
				console.error("Server error:", errorText);
				return {success: false, message: "Server error occurred."};
			}

			const data = await res.json();

			if (!data.success) {
				return {success: false, message: data.message};
			}

			set((state) => ({
				products: state.products.map((product) =>
					product._id === pid ? data.data : product
				),
			}));

			return {success: true, message: "Product updated successfully"};
		} catch (err) {
			console.error("Update failed:", err.message);
			return {success: false, message: "Something went wrong"};
		}
	},
}));
