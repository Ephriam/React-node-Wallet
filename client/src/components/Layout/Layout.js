import React, { Component } from 'react'
import Header from '../Header/Header'
import SideNav from '../SideNav/SideNav'
import Auth from '../Auth/Auth'
import {signin, signup} from '../../services/authService'
import { getUser } from '../../services/userService'
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import Wallet from '../Wallet/Wallet'
import HumIcon from '../HumIcon/HumIcon'
import Gurd from '../Gurd/Gurd'

class Layout extends Component {
    
    state = {
        showSideNav: false,
        isLoggedIn: false,
        signIn: true,
        user: {}
    }
    
    auth = () => {
        return (<Auth signIn={this.state.signIn} 
        toggleSignIn={this.toggleSignIn}
        submitSignUp={this.submitSignUp}
        submitSignIn={this.submitSignIn}/>)
    }

    toggleSideNav = () => {
        this.setState({showSideNav: !this.state.showSideNav})
    }

    toggleSignIn = () => {
        this.setState({signIn: !this.state.signIn})
    }

    submitSignUp = (form) => {
        signup(form)
    }

    submitSignIn = (form) => {
        signin(form)
        .then((res) => {
            localStorage.Auth = res.data.token
            return getUser()
        }).then(res => {
            this.setState({
                user: res.data.user,
                isLoggedIn: true
            })
            this.props.history.push('/s')
        }).catch(err => {
            if(err.response.status === 401){
                console.log('Err')
            } 
        })
    }

    logout = () => {
        this.setState({isLoggedIn: false, showSideNav: false})
        this.props.history.push('/')
    }
    
    wallet = () => <Wallet user={this.state.user}/>

    render() {
        return (
            <div>
                <Header toggleSideNav={this.toggleSideNav} show 
                 showHumIcon={this.state.isLoggedIn}>
                    header
                </Header>
                <SideNav toggleSideNav={this.toggleSideNav} showSideNav={this.state.showSideNav}>
                    <HumIcon show toggleSideNav={this.toggleSideNav}/>
                    <ul>
                        <li><Link to='/s'>Wallet</Link></li>
                        <li><a onClick={this.logout}>Logout</a></li>
                    </ul>
                </SideNav>
                <main>
                    <Switch>
                        <Route exact path='/' component={this.auth}/>
                        <Gurd path='/s' component={this.wallet} authed={this.state.isLoggedIn}/>
                    </Switch>
                   
                </main>
            </div>
        ) 
    }
    
}


export default withRouter(Layout)