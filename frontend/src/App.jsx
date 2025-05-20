import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import {Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const App = () => {
	return (
		<div>
			<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
				{/* Your navbar here */}

				<Navbar />

				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>

					<Route
						path="/create"
						element={<CreatePage />}
					/>
				</Routes>
				<Toaster position="top-center" />
			</div>
		</div>
	);
};

export default App;
