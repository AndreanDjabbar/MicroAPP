import axios from "axios";
import feedback from "../components/layouts/feedback";

const getFeedbacksService = async (): Promise<feedback[]> => {
  try {
    const response = await axios.get<{ feedbacks: feedback[] }>(
      "http://localhost:4001/feedback/getFeedbacks"
    );
    
    console.log("✅ API Full Response:", response.data);

    return response.data.feedbacks; 
  } catch (error) {
    console.error("❌ Error fetching feedbacks:", error);
    throw error;
  }
};

export default getFeedbacksService;
