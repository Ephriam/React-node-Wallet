import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const gurd = ({component: Component , authed}) => {
    return  <Route render ={(props) => (
            authed === true ? <Component /> :
                <Redirect to={{pathname: '/'}}/>
            )}/>

}

export default gurd
