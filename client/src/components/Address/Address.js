import React from 'react'
import classes from './Address.css'

const address = (props) => {
    return (
        <div className={classes.Address}>
                <p>Your reciveing address: {props.address}</p>      
        </div>
    )
}

export default address