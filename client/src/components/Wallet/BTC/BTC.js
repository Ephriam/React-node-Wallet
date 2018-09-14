import React from 'react'
import classes from './BTC.css'
import Address from '../../Address/Address'
import Send from '../../Send/Send'


const BTC = (props) => {
    return (
        <div className={classes.BTC}>
            <Address address={props.address }/>
            <Send balance={props.balance} type=' BTC'/>
            pending
        </div>
    )
}

export default BTC