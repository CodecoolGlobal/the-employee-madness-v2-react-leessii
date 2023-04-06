import React from 'react'

const EmployeeFilter = ( { onChange, onInput } ) => {
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

    </div>
  )
}

export default EmployeeFilter