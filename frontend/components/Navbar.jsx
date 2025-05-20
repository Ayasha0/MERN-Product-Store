import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CiSquarePlus} from "react-icons/ci";

const Navbar = () => {
	const [colormode, setColormode] = useState("light");

	// Toggle between light and dark mode
	const toggleColormode = () => {
		const newMode = colormode === "light" ? "dark" : "light";
		setColormode(newMode);
	};

	// Effect to update body class based on colormode
	useEffect(() => {
		if (colormode === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [colormode]);

	return (
		<div className="container flex items-center justify-center border-b-[1px] border-gray-400">
			<nav className="flex justify-between w-[1140px] py-3">
				<div className="logo">
					<Link
						to="/"
						className="text-2xl text-blue-400">
						Product Store 🛒
					</Link>
				</div>
				<div className="flex gap-2 items-center">
					<Link to="/create">
						<button className="bg-gray-100 p-2 rounded-sm hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
							<CiSquarePlus size={20} />
						</button>
					</Link>
					<button
						onClick={toggleColormode}
						className="text-xl hover:bg-gray-200 transition-transform dark:text-white bg-gray-100 dark:bg-gray-800 text-black p-1 rounded-sm">
						{colormode === "light" ? "🌙" : "☀️"}
					</button>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
