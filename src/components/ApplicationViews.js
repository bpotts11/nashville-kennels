import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
// import { CustomerList } from "./customer/CustomerList";
// import { CustomerProvider } from "./customer/CustomerProvider";
// import { EmployeeList } from "./employee/EmployeeList";
// import { EmployeeProvider } from "./employee/EmployeeProvider";
// import { LocationList } from "./location/LocationList";
// import { LocationProvider } from "./location/LocationProvider";

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route exact path="/animals">
                    <AnimalList />
                </Route>
            </AnimalProvider>
            {/* Render the animal list when http://localhost:3000/customers */}
            {/* <Route path="/customers">
                <CustomerProvider>
                    <CustomerList />
                </CustomerProvider>
            </Route> */}
            {/* Render the animal list when http://localhost:3000/employees */}
            {/* <Route path="/employees">
                <EmployeeProvider>
                    <EmployeeList />
                </EmployeeProvider>
            </Route> */}
            {/* Render the animal list when http://localhost:3000/locations */}
            {/* <Route path="/locations">
                <LocationProvider>
                    <LocationList />
                </LocationProvider>
            </Route> */}
        </>
    )
}