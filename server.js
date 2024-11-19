import express from 'express';
import 'dotenv/config';
import 'morgan';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dbConfig from './config/dbConfig.js';
import UserRouter from './routes/userRoutes.js';

const app = express();
const Port = process.env.PORT 
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(UserRouter)


dbConfig()
app.listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}`)
})