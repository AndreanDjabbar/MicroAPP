import axios from "axios";
import userData from "../components/layouts/userData";

const insertEmployeeService = async(formData: userData): Promise<string> => {
    try {
        const response = await axios.post('http://localhost/employee/insertEmployee', {
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
    } catch (error) {
        console.log(error);
        return 'error';
    }
}

export default insertEmployeeService;
