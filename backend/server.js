import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";



const app = express();

dotenv.config();

const PORT = ENV_VARS.PORT;

app.use(express.json()); // will allow us to parse req.body

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log('Server started at http://localhost:'+ PORT);
    connectDB();
})