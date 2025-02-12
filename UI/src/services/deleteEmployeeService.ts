import axios from "axios";

const deleteEmployeeService = async(id: number) => {
    try {
        const response = await axios.delete(`http://localhost:4000/employee/deleteEmployee/${id}`);
        const {message} = response.data;
        console.log(`message: ${message}`);
        return message;
    } catch(err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
}

export default deleteEmployeeService;