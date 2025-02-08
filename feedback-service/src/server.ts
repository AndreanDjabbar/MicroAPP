import fastify from "fastify";
import mainRoutes from "./routes/mainRoutes.js";
import { dbInit } from "./configs/mainConfigs.js";
import cors from "@fastify/cors";

const server = fastify();

server.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true, 
});

const startServer = async () => {
    try {
        await dbInit();
        server.register(mainRoutes, { prefix: "/feedback" });

        const address = await server.listen({ port: 4001, host: "0.0.0.0" });
        console.log(`🚀 Server listening at ${address}`);
    } catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1);
    }
};

startServer();
