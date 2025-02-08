import { Request, Response } from "express";
import { addEmployeeService, deleteEmployeeService, getEmployeesService, updateEmployeeService } from "../services/mainServices.js";
import { data } from "../interfaces/data.js";

const insertEmployeeController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, age, isMarried } = req.body;

        if (!username || typeof username !== "string" || username.length < 5) {
            res.status(400).json({ error: "Name must be at least 5 characters long" });
            return;
        }

        const employeeData: data = { name: username, age, isMarried };
        await addEmployeeService(employeeData);

        res.status(201).json({
            status: "Success",
            message: "Successfully added employee",
            dataEmployee: { employeeName: username }
        });
        return;
    } catch (err) {
        console.error("Error adding employee:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};

const getEmployeeController = async(req: Request, res: Response) => {
    const employees = await getEmployeesService();
    res.json({
        employees: employees
    })
}

const updateEmployeeController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, age, isMarried } = req.body;

        if (!name || typeof name !== "string" || name.length < 5) {
            res.status(400).json({ error: "Name must be at least 5 characters long" });
            return;
        }

        const updatedEmployee = await updateEmployeeService(Number(id), { name, age, isMarried });

        if (!updatedEmployee) {
            res.status(404).json({ error: "Employee not found" });
            return;
        }

        res.status(200).json({
            status: "Success",
            message: "Employee updated successfully",
            updatedEmployee
        });
    } catch (err) {
        console.error("Error updating employee:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteEmployeeController = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        await deleteEmployeeService(Number(id));
        res.status(200).json({
            status: "Success",
            message: "Employee deleted successfully",
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export {
    insertEmployeeController,
    getEmployeeController,
    updateEmployeeController,
    deleteEmployeeController
};
