import React from 'react'
import classes from './Auth.css'

const auth = (props) => {
    let signUpForm ={}
    let signInForm ={}
    let signUp =(
    <div className={classes.Form}>
        <div className={classes.FormBody}>
        <h3>Sign Up</h3>
        <div className="form-inline">
            <label>User Name:</label>
            <input type="text" className="inputs" value={signUpForm.userName}
            onChange={(e)=>{signUpForm.userName = e.target.value}}/>
        </div>
        <div className="form-inline">
            <label>Email:</label>
            <input type="email" className="inputs" value={signUpForm.email}
            onChange={(e)=>{signUpForm.email = e.target.value}}/>
        </div>
        <div className="form-inline">
            <label>Password:</label>
            <input type="password" className="inputs" value={signUpForm.password}
            onChange={(e)=>{signUpForm.password = e.target.value}}/>
        </div>
        <button onClick={()=>{props.submitSignUp(signUpForm)}}>Signup</button>
        <button onClick={props.toggleSignIn}>Signin</button>
    </div>
    </div>)
    let signIn = (
            <div className={classes.Form}>
            <div className={classes.FormBody}>
                <h3>Sign In</h3>
                <div className={classes.FormInline}>
                    <label>Email:</label>
                    <input type="email" className="inputs" value={signInForm.email}
                    onChange={(e)=>{signInForm.email = e.target.value}}/>
                </div>
                <div className="form-inline">
                    <label>Password:</label>
                    <input type="password" className="inputs" value={signInForm.password}
                    onChange={(e)=>{signInForm.password = e.target.value}}/>
                </div>
                <button onClick={()=>{props.submitSignIn(signInForm)}}>SignIn</button>
                <button onClick={props.toggleSignIn}>Signup</button>
            </div>
            </div>
        )
    return (
        <div className={classes.Container}
            style={props.signIn ? {transform: 'translateX(0%)'}
            : {transform: 'translateX(-50%)'}}>
            {signIn}
            {signUp}
        </div>
    )
}

export default auth;