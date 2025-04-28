import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import  express from "express"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import { messageRoutes } from "./routes/message.route.js";
import cors from "cors"
dotenv.config()

const app = express();
const PORT = process.env.PORT


app.use(express.json())
app.use(cookieparser())
app.use(cors(
    
    {
        origin: "http://localhost:5173",
        credentials: true
    }
    ))


// declare all middlewares before mounting any route or else it will not work
app.use("/api/auth", authRoutes)
app.use("/api/message",messageRoutes)

app.listen(PORT,() =>{
    console.log("server is running on port "+ PORT)

    connectDB()
})

