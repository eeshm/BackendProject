import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

//cors configuration for cors imported from env 
app.use(cors({
        origin:process.env.CORS_ORIGIN,
        credential:true 

}))

//configuration
app.use(express.json({limit:"16kb"})) //middlware for accepting json files
app.use(express.urlencoded({extended:true,limit:'16kb'}))  //middleware conf for values in url
app.use(express.static("public")) //for storing images favicon in our public folder if needed


//for setting conf for cookie parser for securely accessing and storing cookies in browser
app.use(cookieParser())

 





//routes import 
import userRouter from './routes/user.routes.js'


//routes declaration (using middleware using (app.use))
app.use("/api/v1/users",userRouter)


export { app }
