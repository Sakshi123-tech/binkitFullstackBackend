import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDb.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'
import { webhookStripe } from './controllers/order.controller.js'

const app = express()
const allowedOrigins = [
  'https://blinkitgrocerywebsiteinmin.onrender.com',
  'https://blinkitfullstackfrontend.onrender.com',
  'https://blinkitgrocerywebsite.onrender.com',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.post(
  "/api/order/webhook",
  express.raw({ type: "application/json" }),
  webhookStripe
);
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT 

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})
process.on("unhandledRejection", (reason, promise) => {
  console.error("🔥 Unhandled Promise Rejection:", reason);
  // Optional: Gracefully shut down the server
});

process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception thrown:", err);
  // Optional: Gracefully shut down the server
});

