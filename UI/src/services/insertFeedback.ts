import axios from "axios";

const insertFeedbackService = async (name: string, message: string) => {
    try {
        const response = await axios.post("http://localhost:4001/feedback/sendFeedback", {
            name: name,
            message: message
        });

        const { status } = response;
        alert(`Insert feedback success: ${status}`);
        console.log(response);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                alert(`Error: ${error.response.status} - ${error.response.data.message || "Something went wrong"}`);
                console.error("Server Error:", error.response.data);
            } else if (error.request) {
                alert("No response from server. Please try again later.");
                console.error("No Response:", error.request);
            } else {
                alert("Request Error: " + error.message);
                console.error("Request Error:", error.message);
            }
        } else {
            alert("Unexpected Error: " + error);
            console.error("Unexpected Error:", error);
        }
    } finally {
        window.location.reload();
    }
};

export default insertFeedbackService;
