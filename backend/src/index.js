import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import  express from "express"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import { messageRoutes } from "./routes/message.route.js";

dotenv.config()

const app = express();

app.use(express.json())
app.use(cookieparser())


app.use("/api/auth", authRoutes)

app.use("/api/message",messageRoutes)

const PORT = process.env.PORT


app.listen(PORT,() =>{
    console.log("server is running on port "+ PORT)

    connectDB()
})

