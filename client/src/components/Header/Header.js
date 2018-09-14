import React from 'react'
import classes from './Header.css'
import HumIcon from '../HumIcon/HumIcon'

const header = (props) => {
    if (props.show){
        return (
            <div className={classes.Header}>
                <HumIcon show={props.showHumIcon} toggleSideNav={props.toggleSideNav}/>
                {props.children}
            </div>
        ) 
    }
    return null

}

export default header