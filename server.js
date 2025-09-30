import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json" assert { type: "json" };


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

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get("/swagger.json", (req, res) => {
    res.json(swaggerFile);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});
