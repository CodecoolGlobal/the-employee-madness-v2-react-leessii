import "./EmployeeTable.css";
import Employee from "../Employee/Employee";

const EmployeeTable = ({ employees, onDelete, pageNumber, pages, setPageNumber, isAsc, setisAsc }) => {
  const handleAsc = () => {
    if (isAsc === null) {
      setisAsc("asc");
    } else if (isAsc === "asc") {
      setisAsc("des");
    } else if (isAsc === "des") {
      setisAsc("asc");
    }

  }
  return (
      <div className="EmployeeTable">
        <h1>Page {pageNumber + 1}</h1>
        <table>
          <thead>
            <tr>
              <th onClick={()=> handleAsc()}>Name</th>
              <th>Level</th>
              <th>Position</th>
              <th>Brand</th>
              <th>Equipment</th>
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
              {pages.map((pageIndex)=> (
                <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>{pageIndex +1}</button>
              ))}
      </div>
  )
};

export default EmployeeTable;
