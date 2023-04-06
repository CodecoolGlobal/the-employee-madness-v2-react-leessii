import React from 'react'

const EmployeeFilter = ( { onChange, onInput, onArrange } ) => {
  return (
    <div>

        <label>
            Chose filter criteria:
            <select name="filter" id="filter" onChange={onChange}>
                <option value="">--Please choose an option--</option>
                <option value="level">Level</option>
                <option value="position">Position</option>
            </select>
        </label>

        <input type="text" onChange={onInput}/>

        <label>
            Chose arragement criteria:
            <select name="arrange" id="arrange" onChange={onArrange}>
                <option value="">--Please choose an option--</option>
                <option value="level">Level</option>
                <option value="position">Position</option>
                <option value="name">Name</option>
            </select>
        </label>

    </div>
  )
}

export default EmployeeFilter