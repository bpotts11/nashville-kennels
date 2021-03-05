import React, { useContext, useEffect, useState } from "react"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Customer.css"
import { useHistory, useParams } from 'react-router-dom';

export const CustomerForm = () => {
    const { getCustomers, getCustomerById, updateCustomer } = useContext(CustomerContext)

    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        email: ""
    });

    const [isLoading, setIsLoading] = useState(true);

    const { customerId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newCustomer = { ...customer }
        newCustomer[event.target.id] = event.target.value
        setCustomer(newCustomer)
    }

    const handleSaveCustomer = () => {
        if (customer.name === "") {
            window.alert("Please enter customer name")
        } else if (customer.address === "") {
            window.alert("Please enter an address")
        } else if (customer.email === "") {
            window.alert("Please enter an email")
        } else {
            //disable the button - no extra clicks
            setIsLoading(true);
            if (customerId) {
                //PUT - update
                updateCustomer({
                    id: customer.id,
                    name: customer.name,
                    address: customer.address,
                    email: customer.email
                })
                    .then(() => history.push(`/customers/detail/${customer.id}`))
            }
        }
    }

    useEffect(() => {
        getCustomers().then(() => {
            if (customerId) {
                getCustomerById(customerId)
                    .then(customer => {
                        setCustomer(customer)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <form className="customerForm">
            <h2 className="customerForm__title">Edit Customer</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Customer name:</label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Customer name" onChange={handleControlledInputChange} value={customer.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Customer address:</label>
                    <input type="text" id="address" required className="form-control" placeholder="Customer address" onChange={handleControlledInputChange} value={customer.address} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Customer email:</label>
                    <input type="text" id="email" required className="form-control" placeholder="Customer email" onChange={handleControlledInputChange} value={customer.email} />
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveCustomer()
                }}>
                Save Customer
            </button>
        </form>
    )
}