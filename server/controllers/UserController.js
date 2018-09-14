var express = require("express")
var router = express.Router()
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var models = require('../models/index')
var Auth = require('./AuthController')
var User = models.User
const wallet = require('./WalletController');

router.get('/', (req, res)=>{
    User.find()
        .then((users) => {
            users.map(user => user.password = undefined)
           res.status(200).json( users) 
        }).catch((err) =>{
            res.status(500).json({err: 'error'})
        })    
})

router.post('/', Auth.tokenChecker, (req, res)=>{
    User.find()
        .then((users) => {
            users.map(user => user.password = undefined)
           res.status(200).json( users) 
        }).catch((err) =>{
            res.status(500).json({err: 'error'})
        })    
})

router.post('/getUser', Auth.tokenChecker, (req, res)=>{
    User.findById(req.user.id)
        .then((user) => {
            user.password = 'undefined'
           res.status(200).json( user) 
        }).catch((err) =>{
            res.status(500).json({err: 'error'})
        })    
})


router.post('/signup', (req, res) => {    
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){return res.status(409).json({error: err})}
        else{
            User.nextCount((err, count)=>{
                let addresses = wallet.newAddress(count)
                new User({
                name: req.body.name,
                email: req.body.email,
                addresses: {
                    bitcoin: addresses[0],
                    bitcoinTestnet: addresses[1]
                },
                password: hash
            }).save()
            .then((result)=>{
                res.status(201).json(result)
            }).catch((err) => {
                res.status(409).json({err: 'duplicate document'})
            })
            })
 
        }
    })
})

router.post('/signin', (req, res) => {
    User.find({email: req.body.email}).then((user) => {
        if(user.length < 1){
            return res.status(401).json({msg: 'invalid credentials'})
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if(result){
            let token = jwt.sign({id: user[0].id}, 'JWT_SECRET', {expiresIn: '10h'})
            return res.status(200).json({msg: 'Auth successful', token: token})  
          }
          return res.status(401).json({msg: 'invalid credentials'})
        })        
    }).catch((err) => {
        res.status(500).json({err: 'error'})
    })
})

router.delete('/', (req, res) => {
    User.findByIdAndRemove(req.body.id, (err, user) => {
        if(err){
            res.status(200).send(err)
        }else{
            res.status(500).json(user)
        }
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

router.post('/get_user', Auth.tokenChecker, (req, res, next) => {
    User.findById(req.user.id)
    .then((user) => {
        user.password = null
        user.index = null
        user.__v = null
        res.status(200).json({user: user})
    }).catch((err) => {
        res.status(500).json({error: err})
    })    
})

router.post('/send_bt', Auth.tokenChecker, (req, res)=>{
    User.findById(req.user.id)
    .then((user) => {
        wallet.sendBitcoinTransaction({to: req.to, amount: req.amount, from: user.addresses.bitcoinTestnet})
        .then(body=>{
            console.log(body)
        }).catch(err=>{
            return res.status(500).json({error: err})
        })
    }).catch((err) => {
        res.status(500).json({error: err})
    }) 
})

router.post('/protected', Auth.tokenChecker, (req, res, next) => {
    User.findById(req.user.id)
    .then((user) => {
        user.password = null
        res.status(200).json({user: user})
    }).catch((err) => {
        res.status(500).json({error: err})
    })
    
})

module.exports = router;