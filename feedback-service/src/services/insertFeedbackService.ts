import { dbInit } from "../configs/mainConfigs.js";

export const insertFeedbackService = async (name: string, message: string) => {
  try {
    const db = await dbInit(); 
    const feedbacksCollection = db.collection("feedbacks");

    const result = await feedbacksCollection.insertOne({ name, message, createdAt: new Date() });
    return { success: true, id: result.insertedId, message: "success" };
  } catch (error) {
    console.error("❌ Error inserting feedback:", error);
    return { success: false, error, message: "error" };
  }
};
