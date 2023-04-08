import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Equipment from '../Components/Equipment/Equipment';

const createEquipment = (equipment) => {
    return fetch("http://localhost:8080/api/equipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipment),
    }).then((res) => res.json())
    .catch((err) => console.log(err))
  };

const fetchEquipment = (dataSetter) => {
    return fetch(`/api/equipment/`)
    .then((res) => res.json())
    .then((data) => dataSetter(data));
};

const EquipmentCreator = () => {
    const navigate = useNavigate();
    const [equipmentList, setEquipmentList] = useState(null);

    const handleSubmitt = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = [...formData.entries()];
    
        const equipment = entries.reduce((acc, entry) => {
          const [k, v] = entry;
          acc[k] = v;
          return acc;
        }, {})
        createEquipment(equipment);
    }

    useEffect(() => {
        fetchEquipment(setEquipmentList);
    }, [equipmentList])

  return (
    <div>
        <form className="EmployeeForm" onSubmit={handleSubmitt}>
            <div className="control">
                <label>
                    Name:
                <input
                    name="name"
                    id="name"
                />
                </label>
            </div>

            <div className="control">
                <label>
                    Type:
                <input
                    name="type"
                    id="type"
                />
                </label>
            </div>

            <div className="control">
                <label>
                    Amount:
                <input
                    type="number"
                    name="amount"
                    id="amount"
                />
                </label>
            </div>

            <div className="buttons">
                <button type="submit">
                    Create Equipment
                </button>

                <button type="button" onClick={() => navigate("/")}>
                    Cancel
                </button>
            </div>
        </form>

        <div className="EmployeeTable">
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th />
                    </tr>
                </thead>
                <tbody>
                    {equipmentList?.map((equipment) => (
                        <Equipment
                            key={equipment._id} 
                            equipment={equipment}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default EquipmentCreator