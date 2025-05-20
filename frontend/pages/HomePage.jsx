import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useProductStore} from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const {fetchProducts, products} = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	return (
		<div className="p-10 w-full  overflow-x-hidden">
			<div className="inner-container mx-auto flex justify-center items-center flex-col w-[90%] ">
				<h1 className="text-3xl text-blue-500 font-semibold text-center mb-5">
					Current Products
				</h1>

				<div className="products-container mx-auto flex flex-wrap gap-4 p-4 bg-gray-100 rounded-sm max-w-6xl mx-auto justify-center">
					{products.length === 0 ? (
						<h3 className="text-xl text-gray-400">
							No Products found |
							<Link
								to="/create"
								className="text-blue-400 text-xl font-bold ml-1">
								Create Products
							</Link>
						</h3>
					) : (
						products.map((product) => (
							<ProductCard
								key={product._id}
								product={product}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
