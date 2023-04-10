import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import EmployeeFilter from "../Components/EmployeeFilter/EmployeeFilter";

const fetchEmployees = (option, input, arragement, pageNumber) => {
  // crate query params using the URLSearchParams() object
  const params = new URLSearchParams();
  // append the values -> to use toString();
  params.append("option", option);
  params.append("input", input);
  params.append("arragement", arragement);
  params.append("pageNumber", pageNumber);

  return fetch(`/api/employees/?${params.toString()}`)
  .then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  // save filter options
  const [option, setOption] = useState(null);
  const [input, setInput] = useState("");
  // save arragement option
  const [arragement, setArragement] = useState(null);
  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  // handle filter functions
  const handleOption = (e) => {
    setOption(e.target.value)
  }

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  // handle arragement
  const handleArrange = (e) => {
    setArragement(e.target.value)
  }

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees(option, input, arragement, pageNumber)
      .then(({totalPages, employees}) => {
        setLoading(false);
        setTotalPages(totalPages);
        setEmployees(employees);
      })
  }, [option, input, arragement, pageNumber]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <EmployeeFilter onChange={handleOption} onInput={handleInput} onArrange={handleArrange} />
      <EmployeeTable employees={employees} onDelete={handleDelete} pageNumber={pageNumber} pages={pages} setPageNumber={setPageNumber}/>;
    </>
  )
};

export default EmployeeList;
