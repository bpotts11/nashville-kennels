import React from "react"
import { Link } from "react-router-dom"
import "./Location.css"

export const LocationCard = ({ location }) => (
    <section className="location">
        <h3 className="location__name">
            <Link to={`/locations/detail/${location.id}`}>
                {location.name}
            </Link>
        </h3>
        <div>{location.employees.length} Employees</div>
        <div>{location.animals.length} Animals</div>
    </section>
)