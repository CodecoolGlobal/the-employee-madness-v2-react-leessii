import React, { useEffect, useState } from 'react'

const fetchEquipment = (para, setEmployees) => {
    return fetch(`/employees/${para}`)
    .then((res) => res.json())
    .then((data) => setEmployees(data))
    .then((err) => console.log(err))
  };

const EquipmentSearch = () => {
    const [employees, setEmployees] = useState(null);
    // get the URL path
    const path = window.location.pathname; 
    const parts = path.split('/'); 
    const paraValue = parts[parts.length - 1]; 

    useEffect(() => {
        fetchEquipment(paraValue, setEmployees)
    }, [])

  return (
        <div className="EmployeeTable">
            <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Position</th>
                <th />
                </tr>
            </thead>
            <tbody>
                {employees?.map((employee) => (
                <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
  )
}

export default EquipmentSearch