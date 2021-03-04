import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import "./Location.css"
import { useHistory, useParams } from 'react-router-dom';

export const LocationForm = () => {
    const { addLocation, getLocations, getLocationById, updateLocation } = useContext(LocationContext)

    const [location, setLocation] = useState({
        name: "",
        address: ""
    });

    const [isLoading, setIsLoading] = useState(true);

    const { locationId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newLocation = { ...location }
        newLocation[event.target.id] = event.target.value
        setLocation(newLocation)
    }

    const handleSaveLocation = () => {
        if (location.name === "") {
            window.alert("Please enter a location")
        } else if (location.address === "") {
            window.alert("Please enter an address")
        } else {
            //disable the button - no extra clicks
            setIsLoading(true);
            if (locationId) {
                //PUT - update
                updateLocation({
                    id: location.id,
                    name: location.name,
                    address: location.address
                })
                    .then(() => history.push(`/locations/detail/${location.id}`))
            } else {
                //POST - add
                addLocation({
                    name: location.name,
                    address: location.address
                })
                    .then(() => history.push("/locations"))
            }
        }
    }

    useEffect(() => {
        getLocations().then(() => {
            if (locationId) {
                getLocationById(locationId)
                    .then(location => {
                        setLocation(location)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])


    return (
        <form className="locationForm">
            <h2 className="locationForm__title">New Location</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location name:</label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Location name" onChange={handleControlledInputChange} value={location.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Location address:</label>
                    <input type="text" id="address" required className="form-control" placeholder="Location address" onChange={handleControlledInputChange} value={location.address} />
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveLocation()
                }}>
                {locationId ? "Save Location" : "Add Location"}
            </button>
        </form>
    )
}