import { prisma } from '../configs/dbInit.js';
import { data } from '../interfaces/data.js';

const addEmployeeService = async (data: data) => {
  try {
    const { name, age, isMarried } = data;
    
    const newEmployee = await prisma.employee.create({
      data: {
        name: name,
        age: age,
        isMarried: isMarried,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    return newEmployee;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw new Error('Failed to add employee');
  }
};

const getEmployeesService = async () => {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        age: true,
        isMarried: true,
        updatedAt: true,
      },
    });
    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw new Error('Failed to fetch employees');
  }
};

const updateEmployeeService = async (id: number, updatedData: data) => {
  try {
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        name: updatedData.name,
        age: updatedData.age,
        isMarried: updatedData.isMarried,
        updatedAt: new Date(),
      },
    });

    return employee;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw new Error("Failed to update employee");
  }
};

const deleteEmployeeService = async (id: number) => {
  try {
    await prisma.employee.delete({
      where: { id },
    });

    return { message: "Employee deleted successfully" };
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw new Error("Failed to delete employee");
  }
};


export {
    addEmployeeService,
    getEmployeesService,
    updateEmployeeService,
    deleteEmployeeService
};