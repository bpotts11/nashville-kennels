import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom';

export const EmployeeForm = () => {
    const { addEmployee, getEmployees, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    const [employee, setEmployee] = useState({
        name: "",
        locationId: 0,
        job: ""
    });

    const [isLoading, setIsLoading] = useState(true);

    const { employeeId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newEmployee = { ...employee }
        newEmployee[event.target.id] = event.target.value
        setEmployee(newEmployee)
    }

    const handleSaveEmployee = () => {
        if (employee.name === "") {
            window.alert("Please enter an employee")
        } else if (parseInt(employee.locationId) === 0) {
            window.alert("Please select at location")
        } else if (employee.job === "") {
            window.alert("Please enter a job")
        } else {
            //disable the button - no extra clicks
            setIsLoading(true);
            if (employeeId) {
                //PUT - update
                updateEmployee({
                    id: employee.id,
                    name: employee.name,
                    locationId: parseInt(employee.locationId),
                    job: employee.job
                })
                    .then(() => history.push(`/employees/detail/${employee.id}`))
            } else {
                //POST - add
                addEmployee({
                    name: employee.name,
                    locationId: parseInt(employee.locationId),
                    job: employee.job
                })
                    .then(() => history.push("/employees"))
            }
        }
    }

    useEffect(() => {
        getLocations().then(() => {
            if (employeeId) {
                getEmployeeById(employeeId)
                    .then(employee => {
                        setEmployee(employee)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])


    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">{employeeId ? "Edit Employee" : "Add Employee"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Employee name:</label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Employee name" onChange={handleControlledInputChange} value={employee.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Assign to location: </label>
                    <select value={employee.locationId} name="locationId" id="locationId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="job">Job:</label>
                    <input type="text" id="job" required className="form-control" placeholder="Employee job" onChange={handleControlledInputChange} value={employee.job} />
                </div>
            </fieldset>

            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveEmployee()
                }}>
                {employeeId ? "Save Employee" : "Add Employee"}
            </button>
        </form>
    )
}