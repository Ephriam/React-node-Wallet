var bitcore = require('bitcore-lib');
var explorer = require('bitcore-explorers');
var HDPrivateKey = bitcore.HDPrivateKey;
var Address = bitcore.Address;
var Networks = bitcore.Networks;
var testnetInsight = new explorer.Insight('https://test-insight.bitpay.com');
var Transaction = bitcore.Transaction;
var User = require('../models/User');
var xPrivateKey = HDPrivateKey('xprv9s21ZrQH143K3MxnZ8MpmLN3bTkqL5bECUqrhkMaK4qCLdniXXTa1UJTvXgupXUkp2WKQzDefv5Wdv4NEijKQ1h6an6c5H9ppH5E1D7jMn1');
var xPublicKey = xPrivateKey.hdPublicKey;
var request = require('request')

unit = bitcore.Unit;

exports.newAddress = function(count){
    let bitcoinMainnet = Address(xPrivateKey.derive("m/"+count).publicKey, Networks.livenet)
    let bitcoinTestnet = Address(xPrivateKey.derive("m/"+count).publicKey, Networks.testnet)
    return [bitcoinMainnet, bitcoinTestnet]
}

var getUtxosChain = function(address, net){
    console.log(ChainInsight + 'get_tx_unspent/' + net + '/' + address)
    return new Promise((resolve, reject) => {
        request({
            uri: ChainInsight + 'get_tx_unspent/' + net + '/' + address,
            json: true
          },
            (error, response, body) => {
              if(error) reject(error);
              resolve(body)}
          )
    })
}

var formatedUtxos = function(utxos){
    let formatedUtxos = []
    for(i=0; i<utxos.data.txs.length; i++){
        let temp ={txid: utxos.data.txs[i].txid, vout: utxos.data.txs[i].output_no, scriptPubKey: utxos.data.txs[i].script_hex, satoshis: parseInt(utxos.data.txs[i].value*100000000)}
        formatedUtxos.push(temp)
    }
    return formatedUtxos
}

var getBalanceFromUtxos = function(utxos){
    let balance = 0;
        for (var i = 0; i < utxos.length; i++) {
          balance +=utxos[i]['satoshis'];
        }
    return balance;
}

exports.sendBitcoinTransaction = function(_tx, res){
    console.log('btc transaction')
    return new Promise((resole, reject)=>{
       testnetInsight.getUnspentUtxos(_tx.from, function(err, utxos){
       if((err == null)&&(getBalanceFromUtxos(utxos)-unit.fromBTC(_tx.amount).toSatoshis()-1000)>0){
          var tx = Transaction()
            .from(utxos)
            .to(_tx.to, unit.fromBTC(_tx.amount).toSatoshis())
            .fee(1000)
            .change(user.testnetLitecoinAddress)
            .sign(xPrivateKey.derive("m/"+user.index).privateKey)
            if(tx.getSerializationError()){
                console.log('Serialization error');
                console.log(tx.getSerializationError().message);
                return reject(message)
            }
                testnetInsight.broadcast(tx, function(error, body) {
                    if (error) {
                    console.log('Error in broadcast: ' + error);
                    return reject({msg: 'Error: In broadcast'})
                    } else {
                        return resolve(body)
                    }
                });
        }else{console.log(err + 'Or you dont have sufficent funds for this transaction');
            return reject({msg: 'Error: Inssufficent funds'})
        }
        })
    })
    
}
