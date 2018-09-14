import React from 'react'
import classes from './ETH.css'
import Address from '../../Address/Address'
import Send from '../../Send/Send'


const ETH = (props) => {
    return (
        <div className={classes.ETH}>
            <Address address={props.address}/>
            <Send balance={props.balance} type='ETH'/>
            pending
        </div>
    )
}

export default ETH