// services/auth-service/swagger.js
import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "User Service API",
        description: "User endpoints"
    },
    host: "localhost:5001", // used by swagger-autogen for docs generation (dev)
    schemes: ["http"],
    components: {
        securitySchemes: {
            bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
        }
    },
    tags: [{ name: "User", description: "User endpoints" }]
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/userRoutes.js"]; // adjust to your routes entry file(s)

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    console.log("swagger-output.json created.");
});
