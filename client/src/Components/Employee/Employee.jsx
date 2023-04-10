import React, { useState } from 'react';
import { Link } from "react-router-dom";

const updateAttendance = (id, present) => {
    return fetch(`/api/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( { present: Boolean(!present) } ),
    }).then((res) => res.json());
  };

const Employee = ( { employee, onDelete } ) => {
    const [present, setPresent] = useState(Boolean(employee.present));

    const handleChange = (id) => {
        setPresent(!present);
        updateAttendance(id, present);
    }

  return (
    <tr>
        <td>{employee.name}</td>
        <td>{employee.level}</td>
        <td>{employee.position}</td>
        <td>{employee.brand.name}</td>
        <td>{employee.equipment}</td>
        <td><input type="checkbox" checked={present} onChange={() => handleChange(employee._id)}/></td>
        <td>
            <Link to={`/update/${employee._id}`}>
            <button type="button">Update</button>
            </Link>
            <button type="button" onClick={() => onDelete(employee._id)}>
            Delete
            </button>
        </td>
    </tr>
  )
}

export default Employee