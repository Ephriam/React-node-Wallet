import React from 'react'
import classes from './Send.css'

const send = props => {
    return (
        <div className={classes.Send}>
            
            <div className={classes.FormContainer}>
                <p>Balance: {props.balance} {props.type}</p>
                <div className={classes.FormInline}>
                    <label>To:</label><input type='text'/>
                </div>
                
                <div className={classes.FormInline}>
                    <label>Amount:</label><input type='text'/>
                </div>
                <button>Send</button>                
            </div>
        </div>
    )
}

export default send