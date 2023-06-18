import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { loginUser, registerUser } from './controller/authController.js'
import verifyToken from './middleware/verifyToken.js'
import { getProfile } from './controller/userController.js'



const app = express()

dotenv.config()
app.use(bodyParser.json({ extended: true, limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const port = process.env.PORT || 5000


mongoose.connect(process.env.MONGO_DB, { useNewURLParser: true, useUnifiedTopology: true }).then(() => app.listen(port, () => console.log(`node server started at ${port}`))).catch((error) => console.log(error))

app.post('/register',registerUser)
app.post('/login',loginUser)
app.get('/profile',verifyToken,getProfile)


