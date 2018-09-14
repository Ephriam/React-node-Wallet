import React from 'react'
import classes from './BTCT.css'
import Address from '../../Address/Address'
import Send from '../../Send/Send'


const BTCT = (props) => {
    return (
        <div className={classes.ETH}>
            <Address address={props.address}/>
            <Send balance={props.balance} type='BTCT'/>
            pending
        </div>
    )
}

export default BTCT