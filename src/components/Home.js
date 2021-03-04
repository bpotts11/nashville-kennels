import React from "react";
import { PropsAndState } from './PropsAndState'

export const Home = () => (
    <>
        <h2>Nashville Kennels</h2>
        <small>Loving care when you're not there.</small>

        <address>
            <div>Visit Us at One of Our Locations</div>
        </address>
        <PropsAndState yourName={"Brittney"} />
    </>
)