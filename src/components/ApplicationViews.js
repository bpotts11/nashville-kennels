import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerList } from "./customer/CustomerList";
import { CustomerProvider } from "./customer/CustomerProvider";
import { EmployeeList } from "./employee/EmployeeList";
import { EmployeeProvider } from "./employee/EmployeeProvider";
import { LocationList } from "./location/LocationList";
import { LocationProvider } from "./location/LocationProvider";
import { AnimalForm } from "./animal/AnimalForm"
import { EmployeeForm } from "./employee/EmployeeForm"
import { LocationForm } from "./location/LocationForm";
import { CustomerForm } from "./customer/CustomerForm";
import { AnimalDetail } from "./animal/AnimalDetail"
import { EmployeeDetail } from "./employee/EmployeeDetail"
import { LocationDetail } from "./location/LocationDetail"
import { CustomerDetail } from "./customer/CustomerDetail"
import { AnimalSearch } from "./animal/AnimalSearch"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <CustomerProvider>
                <Route exact path="/">
                    <Home />
                </Route>
            </CustomerProvider>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        {/* Note the addition of "exact" now that we have an additional route with "/animals" in it below this Route: "/animals/create" */}
                        <Route exact path="/animals">
                            <AnimalSearch />
                            <AnimalList />
                        </Route>
                        <Route path="/animals/create">
                            <AnimalForm />
                        </Route>
                        <Route path="/animals/edit/:animalId(\d+)">
                            <AnimalForm />
                        </Route>
                        <Route exact path="/animals/detail/:animalId(\d+)">
                            <AnimalDetail />
                        </Route>
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>
            {/* Render the animal list when http://localhost:3000/customers */}
            <CustomerProvider>
                <Route exact path="/customers">
                    <CustomerList />
                </Route>
                <Route path="/customers/edit/:customerId(\d+)">
                    <CustomerForm />
                </Route>
                <Route exact path="/customers/detail/:customerId(\d+)">
                    <CustomerDetail />
                </Route>
            </CustomerProvider>
            {/* Render the animal list when http://localhost:3000/employees */}
            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees">
                        <EmployeeList />
                    </Route>
                    <Route path="/employees/create">
                        <EmployeeForm />
                    </Route>
                    <Route path="/employees/edit/:employeeId(\d+)">
                        <EmployeeForm />
                    </Route>
                    <Route exact path="/employees/detail/:employeeId(\d+)">
                        <EmployeeDetail />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>
            {/* Render the animal list when http://localhost:3000/locations */}
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
                <Route path="/locations/create">
                    <LocationForm />
                </Route>
                <Route path="/locations/edit/:locationId(\d+)">
                    <LocationForm />
                </Route>
                <Route exact path="/locations/detail/:locationId(\d+)">
                    <LocationDetail />
                </Route>
            </LocationProvider>
        </>
    )
}