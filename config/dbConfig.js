import 'mongoose'
import mongoose from 'mongoose'
import 'dotenv/config'

const dbConfig = async() =>{
    const MONGO_URL = process.env.MONGODB_URL
    try{
        const connectDB = await mongoose.connect(MONGO_URL)
        if(connectDB){
            console.log(`Successful connection to Database`)
        }else{
            console.log(`Error connecting to database`)
        }
}catch(error){
    console.error(error.message)
}
}

export default dbConfig