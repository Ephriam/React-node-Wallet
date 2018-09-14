import React from 'react'
import classes from './SideNav.css'
import Backdrop from '../Backdrop/Backdrop'

const sideNav = (props) => {
        return (
            <div>                 
                <div className={classes.SideNav} 
                style={props.showSideNav ? { transform:'translateX(0)'} 
                        : {transform: 'translateX(-320px)'}}>                    
                    {props.children}
                </div>
                <Backdrop show={props.showSideNav} toggleParent={props.toggleSideNav}/>
            </div>
        ) 
}

export default sideNav
