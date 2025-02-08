import { dbInit } from "../configs/mainConfigs.js";

const getFeedbacksService = async () => {
    try {
        const db = await dbInit();
        const feedbacks = await db.collection("feedbacks").find().toArray();
        return feedbacks;
    } catch (err) {
        console.error("❌ Error fetching feedbacks:", err);
        return null;
    }
};

export default getFeedbacksService;
