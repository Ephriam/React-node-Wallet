import React from 'react'
import classes from './Nav.css'
import NavItem from '../NavItems/NavItems'

const nav = (props) => {
    return (
        <div className={classes.Nav}>
            <NavItem togglecurrencyNav={props.togglecurrencyNav} active={props.activeNav==='BTC'} type='BTC'>Bitcoin</NavItem>
            <NavItem togglecurrencyNav={props.togglecurrencyNav} active={props.activeNav==='ETH'} type='ETH'>Ether</NavItem>
            <NavItem togglecurrencyNav={props.togglecurrencyNav} active={props.activeNav==='BTCT'} type='BTCT'>Bitcoin Testnet</NavItem>
        </div>
    )
}   

export default nav