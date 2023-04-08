import React, { useState } from 'react';

const deleteEquipment = (id) => {
    return fetch(`http://localhost:8080/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};

const updateEquipment = (id, body) => {
    return fetch(`/api/equipment/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
};

const Equipment = ( { equipment } ) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const handleUpdate = (id) => {
        const body = {
            name: `${name}`,
            type: `${type}`,
            amount: `${amount}`
        }
        console.log(body)
        updateEquipment(id, body);
    }

  return (
    <tr>
        <td><input type="text" placeholder={equipment.name} value={name} onChange={(e) => setName(e.target.value)}/></td>
        <td><input type="text" placeholder={equipment.type} value={type} onChange={(e) => setType(e.target.value)}/></td>
        <td><input type="number" placeholder={equipment.amount} value={amount} onChange={(e) => setAmount(e.target.value)}/></td>
        
        <td>
        <button type="button" onClick={() => handleUpdate(equipment._id)}>Update</button>
        <button type="button" onClick={() => deleteEquipment(equipment._id)}>
            Delete
        </button>
        </td>
    </tr>
  )
}

export default Equipment