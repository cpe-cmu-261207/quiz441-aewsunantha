import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { body, query, validationResult } from 'express-validator'
import { nextTick } from 'process'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 3000
const SECRET = "SIMPLE_SECRET"

interface JWTPayload {
  username: string;
  password: string;
}

app.post('/login',
  (req, res) => {

    const { username, password } = req.body
    // Use username and password to create token.
    if(req.body.username === "sunantha" &&
       req.body.password ==="aew") 
    return res.status(200).json({
      message: 'Login succesfully',
    })
    else  return res.status(400).json({
      message: 'Invalid username or password',
    })
  })

app.post('/register',
  (req, res) => {

    const { username, password, firstname, lastname, balance } = req.body
    var hashPassword = bcrypt.hashSync(req.body.password, 8);
     var User = require('../user/User');
   
    User.create({
    username : req.body.username,
     password : hashPassword,
     firstnameme : req.body.firstname,
     lastname : req.body.lastname,
     balance : req.body.balance
    },
   function (user: any, err: any){
      if(err) return res.status(400).json({
        "message": "Username is already in used"
      })
      else return res.status(200).json({
        "message": "Register successfully"
      })
    })

app.get('/balance',
  (req, res) => {
    const token = req.query.token as string
    try {
      const { username } = jwt.verify(token, SECRET) as JWTPayload
  
    }
    catch (e) {
      //response in case of invalid token
      
    }
  })

app.post('/deposit',
  body('amount').isInt({ min: 1 }),
  (req, res) => {

    //Is amount <= 0 ?

    if (!validationResult(req).isEmpty())
      return res.status(400).json({ message: "Invalid data" })
  })

app.post('/withdraw',
  (req, res) => {
  })

app.delete('/reset', (req, res) => {

  //code your database reset here
  
  return res.status(200).json({
    message: 'Reset database successfully'
  })
})

app.get('/me', (req, res) => {
  
})

app.get('/demo', (req, res) => {
  return res.status(200).json({
    message: 'This message is returned from demo route.'
  })
})

app.listen(3000, () => console.log(`Server is running at ${3000}`))
  })