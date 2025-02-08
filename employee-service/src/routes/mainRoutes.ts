import express from 'express';
import { 
    insertEmployeeController, 
    getEmployeeController, 
    updateEmployeeController, 
    deleteEmployeeController 
} from '../controllers/mainControllers.js';

const router = express.Router();

router.post("/insertEmployee", insertEmployeeController);
router.get("/getEmployees", getEmployeeController);
router.put("/updateEmployee/:id", updateEmployeeController);
router.delete("/deleteEmployee/:id", deleteEmployeeController);

export default router;