import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)

    const [location, setLocation] = useState({})

    const { locationId } = useParams();
    const history = useHistory();
    // debugger
    useEffect(() => {
        getLocationById(locationId)
            .then((response) => {
                setLocation(response)
            })
    }, [])

    return (
        <section className="location">
            <h3 className="location__name">{location.name}</h3>
            <div className="location__address">{location.address}</div>
            <h4>Employees</h4>
            <ul>
                {location.employees?.map(employee => <li key={employee.id}>{employee.name}</li>)}
            </ul>
            <h4>Current Residents</h4>
            <ul>
                {location.animals?.map(animal => <li key={animal.id}>{animal.name}</li>)}
            </ul>
        </section>
    )
}