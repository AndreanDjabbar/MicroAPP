import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import employee from "../components/layouts/employee";

const extractToPDF = (employees:employee[]) => {
  const doc = new jsPDF();
  doc.text("Employee Data", 14, 10);

  const tableColumn = ["Name", "Age", "Married"];
  const tableRows = employees.map((emp) => [
    emp.name,
    emp.age,
    emp.isMarried ? "Yes" : "No",
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("EmployeeData.pdf");
};

export default extractToPDF;