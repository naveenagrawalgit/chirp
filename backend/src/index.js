import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import  express from "express"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import  messageRoutes  from "./routes/message.route.js";
import cors from "cors"
import path from "path"
import { app,server } from "./lib/socket.js";
dotenv.config()

const PORT = process.env.PORT ||5001
const __dirname = path.resolve();

app.use(express.json({limit: '50mb'}))
app.use(cookieparser())
app.use(cors({
    
        origin: process.env.NODE_ENV === "production" 
        ? "https://chirp-va60.onrender.com" 
        : "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
    ))


// declare all middlewares before mounting any route or else it will not work
app.use("/api/auth", authRoutes)
app.use("/api/messages",messageRoutes)


if(process.env.NODE_ENV ===   "production"){

    const staticPath = path.join(__dirname,"..", "frontend","dist")

    app.use(express.static(staticPath));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(staticPath,'index.html'));
    });

}



server.listen(PORT,() =>{
    console.log("server is running on port "+ PORT)

    connectDB()
})

