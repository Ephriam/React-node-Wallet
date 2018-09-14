import React from 'react'
import classes from './NavItems.css'

const navItem = (props) => {
    let navClass = classes.NavItem
    if(props.active){
        navClass = classes.NavItem + ' ' + classes.Active 
    }   

    return (
        <div className={navClass} onClick={()=>props.togglecurrencyNav(props.type)}>
            {props.children}
        </div>
    )
}

export default navItem