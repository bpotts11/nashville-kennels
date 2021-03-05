import { React, useContext, useEffect, useState } from "react";
import { CustomerContext } from "./customer/CustomerProvider";

export const Home = () => {
    const userId = parseInt(localStorage.getItem("kennel_customer"))
    const [user, setUser] = useState({ name: "" })

    const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => {
        getCustomers()
    }, [])

    useEffect(() => {
        const newestUser = customers.find(customer => customer.id === userId)
        if (newestUser) setUser(newestUser)
    }, [customers])

    return (
        <>
            <h2>Nashville Kennels</h2>
            <small>Loving care when you're not there.</small>

            <address>
                <div>Visit Us at One of Our Locations</div>
            </address>
            <h3>Welcome, {user.name}</h3>
        </>
    )
}