import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import BTC from './BTC/BTC'
import ETH from './ETH/ETH'
import BTCT from './BTCT/BTCT'


class Wallet extends Component {
    state = {
        BTC: {
            balance: '0.0',
            tx: []
        },
        ETH: {
            balance: '0.0',
            tx: []
        },
        BTCT: {
            balance: '0.0',
            tx: []
        },
        activeNav: 'BTC'
    }

    togglecurrencyNav = (type) => {
        this.setState({activeNav: type})
    }

    currentWallet = () => {
        if(this.state.activeNav === 'BTC'){
            return(
                <BTC address={this.props.user.addresses.bitcoin}
                     balance={this.state.BTC.balance}/>
            )
        }
        else if(this.state.activeNav === 'ETH'){
            return( 
                <ETH address={this.state.ETH.address}
                    balance={this.state.ETH.balance}/>
            )
        }
        else if(this.state.activeNav === 'BTCT'){
            return( 
                <BTCT address={this.props.user.addresses.bitcoinTestnet}
                    balance={this.state.BTCT.balance}/>
            )
        }
      
    }

    render() { 
        return (
            <div>
                <Nav activeNav={this.state.activeNav} 
                    togglecurrencyNav={this.togglecurrencyNav}/>
                <div>
                    {this.currentWallet()}
                </div>
            </div>
        )
    }      
}

export default Wallet