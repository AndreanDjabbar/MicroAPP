import axios from "axios";

const getEmployeeService = async() => {
    try {
        const data = await axios.get('http://localhost/employee/getEmployees')
        const dataUsers = data.data.employees;
        return dataUsers;
    } catch(err) {
        console.log(err);
    }
}

export default getEmployeeService;