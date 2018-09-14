import React from 'react'
import classes from './HumIcon.css'

const humIcon = (props) => {
    if(props.show){
        return (
            <header className={classes.HumIcon} onClick={props.toggleSideNav}>
                <div></div>
                <div></div>
                <div></div>
            </header>
        )
    }else{return null}
    
}

export default humIcon