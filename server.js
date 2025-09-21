import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({ service: "user-service", status: "ok" });
});

// Users route
app.use("/users", userRoute)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});
