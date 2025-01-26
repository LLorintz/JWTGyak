const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const authenticate = require('./middlewares/authmiddleware')


const app = express()
const PORT = 3000

global.users = [
    {username: 'johnDoe', password:'password'},
    {username: 'maryDoe', password:'password'}
]

const accounts =[
    {accountType:'checking', balance: 5000, username: 'johnDoe'},
    {accountType:'savings', balance: 15000, username: 'johnDoe'},
    {accountType:'checking', balance: 3000, username: 'maryDoe'}
]

app.use(cors())
app.use(express.json())

app.post('/login', (req, res)=>{
    const username = req.body.username
    const password = req.body.password

    const user = users.find((user)=>user.username == username && user.password == password)
    if (user) {
       const token =  jwt.sign({username: user.username}, 'SECRETKEY', { expiresIn: '1h' })
       res.json({success:true,token:token})
    }else{
        res.json({success:false, message: 'Not authenticated'})
    }
})



app.post('/deposit', authenticate, (req,res)=>{
    
})

app.get('/profile/:username', authenticate, (req,res)=>{
    
})

app.get('/accounts/:username', authenticate, (req, res)=>{
    
   const username = req.params.username
   const userAccounts = accounts.filter((account)=>account.username==username)
   res.json(userAccounts)
})

app.listen(3000,()=>{
    console.log(`Server is runnug on PORT ${PORT}`)
})