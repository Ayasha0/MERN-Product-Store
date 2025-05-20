import express from "express";
import connectDB from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.route.js";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// API routes
app.use("/api/products", productRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get(/^(.*)$/, (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
	});
	// app.get("*", (req, res) => {
	// 	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
	// });
}

// Start server & connect DB
app.listen(PORT, () => {
	connectDB();
	console.log(`Environment: ${process.env.NODE_ENV}`);
	console.log(`Server started at http://localhost:${PORT}`);
});
