import "./EmployeeTable.css";
import Employee from "../Employee/Employee";

const EmployeeTable = ({ employees, onDelete }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Present</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <Employee 
            key={employee._id}
            employee={employee}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
