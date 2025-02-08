import userData from "../components/interfaces/userData";
import axios from "axios";

const insertEmployeeService = async(formData: userData): Promise<string> => {
    try {
        const response = await axios.post('http://localhost:4000/employee/insertEmployee', {
            username: formData.username,
            age: formData.age,
            isMarried: formData.isMarried
        }, {
            headers: {
                'Content-Type': 'application/json',  
            }
        });

        const { status } = response.data;
        return status;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.log(error);
        return 'error';
    }
}

export default insertEmployeeService;
