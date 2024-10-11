import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS ={
    MONGO_URI: "mongodb+srv://Fiyaskhan123:Fiyas12@cluster0.mibrx6c.mongodb.net/netflix-app?retryWrites=true&w=majority&appName=Cluster0",
    PORT: process.env.PORT || 5000,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
};