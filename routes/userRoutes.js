import express from 'express'
import { registerUser } from '../controllers/usercontroller.js'

const UserRouter = express.Router()

UserRouter.post("/users/register", registerUser)


export default UserRouter