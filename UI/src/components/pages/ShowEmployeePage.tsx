import { useEffect, useState } from "react";
import getEmployeeService from "../../services/getEmployeeService";
import updateEmployeeService from "../../services/updateEmployeeService";
import deleteEmployeeService from "../../services/deleteEmployeeService";
import employee from "../layouts/employee";
import { useNavigate } from "react-router-dom";
import NavLayout from "./NavLayout";
import extractToPDF from "../../services/extractToPDF";

const ShowEmployeePage = () => {
  const [employees, setEmployees] = useState<employee[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedData, setUpdatedData] = useState<{ [key: number]: employee }>({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tokenAuth");
    if(!token) {
      navigate("/login");
    }

    const fetchEmployees = async () => {
      try {
        const data = await getEmployeeService();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [navigate]);

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsEditing(true);
    setUpdatedData((prev) => ({
      ...prev,
      [id]: employees.find((emp) => emp.id === id) || { id, name: "", age: 0, isMarried: false, updatedAt: new Date() },
    }));
  };

  useEffect(() => {
    let timer:number;
    if (isHovered) {
      timer = setTimeout(() => {
        setShowMenu(true);
      }, 500);
    } else {
      timer = setTimeout(() => {
        setShowMenu(false);
      }, 200)
    }

    return () => clearTimeout(timer);
  }, [isHovered]);

  const handleInputChange = (id: number, field: keyof employee, value: unknown) => {
    setUpdatedData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("adminAccess");
    navigate("/login");
  }

  const handleUpdate = async (id: number) => {
    const updatedEmployee = updatedData[id];
    if (!updatedEmployee) return;
    try {
      const response = await updateEmployeeService(id, updatedEmployee);
      if (response === "success") {
        setEmployees((prev) => prev.map((emp) => (emp.id === id ? updatedEmployee : emp)));
        setEditingId(null);
        alert("Employee updated successfully!");
      } else {
        alert("Failed to update employee.");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployeeService(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      alert("Employee deleted successfully!");
    } catch (err) {
      console.error("Error deleting employee:", err);
      alert("Failed to delete employee.");
    }
  };

  return (
    <div className="border-2 p-6 border-gray-300 rounded-lg shadow-md bg-gray-800 text-white mt-10 mb-14 w-full mx-auto">
      <NavLayout></NavLayout>
      <a
        className="bg-amber-600 p-3 rounded-lg relative hover:bg-amber-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Extract Data
        {showMenu && (
          <div className="absolute top-full left-0 mt-2 bg-gray-900 text-white p-3 rounded-lg shadow-lg backdrop-blur-md transition-opacity duration-300">
            <p className="text-sm font-semibold">Extract as:</p>
              <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
              onClick={() =>{extractToPDF(employees)}}>PDF</button>
            <button className="mt-2 bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded transition">Excel</button>
          </div>
        )}
      </a>
      <h1 className="text-4xl text-amber-400 font-semibold text-center mb-6">Employee Data</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-white">
          <thead>
            <tr className="bg-gray-700 text-amber-400">
              <th className="border border-white p-3">Name</th>
              <th className="border border-white p-3">Age</th>
              <th className="border border-white p-3">Married</th>
              <th className="border border-white p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border border-white text-center">
                {editingId === employee.id
                && isEditing === true ? (
                  <>
                    <td className="border p-2">
                      <input 
                      type="text" 
                      value={updatedData[employee.id]?.name || ""} 
                      onChange={(e) => handleInputChange(employee.id, "name", e.target.value)} 
                      className="bg-gray-700 text-white p-1 border rounded" /></td>
                    <td className="border p-2">
                      <input 
                      type="number" 
                      value={updatedData[employee.id]?.age || ""} 
                      onChange={(e) => handleInputChange(employee.id, "age", Number(e.target.value))} 
                      className="bg-gray-700 text-white p-1 border rounded w-20" /></td>
                    <td className="border p-2">
                      {['Yes', 'No'].map((label, index) => (
                        <label key={index} className="mx-2">
                          <input 
                          type="radio" 
                          name={`isMarried-${employee.id}`} 
                          value={label.toLowerCase()} 
                          checked={(updatedData[employee.id]?.isMarried ?? employee.isMarried) === (label === 'Yes')} 
                          onChange={() => handleInputChange(employee.id, "isMarried", label === 'Yes')} className="accent-amber-400" /> {label}
                        </label>
                      ))}
                    </td>
                    <td className="border p-2 flex justify-center gap-3">
                      <button 
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition" 
                      onClick={() => handleUpdate(employee.id)}>Update</button>
                      <button 
                      className="bg-amber-400 hover:bg-amber-600 text-white p-2 rounded transition" 
                      onClick={() => {setIsEditing(!isEditing)}}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-3">{employee.name}</td>
                    <td className="border p-3">{employee.age}</td>
                    <td className="border p-3">{employee.isMarried ? "Yes" : "No"}</td>
                    <td className="border p-3 flex gap-2 justify-center">
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition" onClick={() => handleEdit(employee.id)}>Edit</button>
                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition" onClick={() => handleDelete(employee.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="fixed bottom-10 right-10  py-[15px] px-[25px] rounded-[15px] text-[#212121] bg-[#e8e8e8] font-bold text-[17px] overflow-hidden transition-all duration-[250] shadow-lg before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:rounded-[15px] before:bg-gray-800 before:-z-10 before:shadow-lg before:transition-all before:duration-[250ms] hover:before:w-full hover:text-amber-300 animate-bounce"
      onClick={handleLogout}>Logout</button>
    </div> 
  );
};

export default ShowEmployeePage;
