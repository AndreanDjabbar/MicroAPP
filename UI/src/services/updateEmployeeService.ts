import axios from "axios";
import employee from "../components/layouts/employee";

const updateEmployeeService = async (id: number, updatedEmployee: employee) => {
  try {
    console.log(id, updatedEmployee);
    const response = await axios.put(`http://localhost/employee/updateEmployee/${id}`, updatedEmployee, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return "success";
    } else {
      return "error";
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    return "error";
  }
};

export default updateEmployeeService;
