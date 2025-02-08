import { FastifyInstance } from "fastify";
import { insertFeedbackController, getFeedbacksController } from "../controllers/mainControllers.js";

const mainRoutes = async(fastify: FastifyInstance) => {
    fastify.get("/getFeedbacks", getFeedbacksController);
    fastify.post("/sendFeedback", insertFeedbackController);
}

export default mainRoutes;