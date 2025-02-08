import { FastifyReply, FastifyRequest } from "fastify";
import { insertFeedbackService } from "../services/insertFeedbackService.js";
import getFeedbacksService from "../services/getFeedbacksService.js";

const insertFeedbackController = async(req: FastifyRequest, rep: FastifyReply) => {

    const { name, message } = req.body as { message: string, name: string };
    
    if(message.length < 5) {
        rep
        .status(400)
        .send({
            status: "error",
            message: "Minimum feedback is 5 char"
        });
        return;
    }

    try {
        const reply = await insertFeedbackService(name, message);
        rep
        .status(201)
        .send({
            status: reply.message,
            id: reply.id
        })
        return;
    } catch(err) {
        console.error(err);
        rep
        .status(400)
        .send({
            status: "error",
            message: err
        });
        return;
    }    
}

const getFeedbacksController = async(req: FastifyRequest, rep: FastifyReply) => {
    console.log("Triggered");
    try {
        const feedbacks = await getFeedbacksService();
        rep
        .status(200)
        .send({
            feedbacks: feedbacks
        })
    } catch(err) {
        console.error(err);
    }
}

export {
    insertFeedbackController,
    getFeedbacksController
};