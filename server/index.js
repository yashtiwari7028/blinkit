import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'

const app = express()

// CORS middleware with frontend URL from .env file
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

// Middleware setup
app.use(express.json())
app.use(cookieParser())

// Set up morgan logging format (you can choose 'combined' or 'dev' for dev environment)
app.use(morgan('combined')) // 'combined' for production or 'dev' for development

// Security middleware (Helmet)
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = process.env.PORT || 8080 // Use process.env.PORT if available

// Test route to check if the server is running
app.get("/", (request, response) => {
    response.json({
        message: "Server is running on port " + PORT
    })
})

// API routes
app.use('/api/user', userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/file", uploadRouter)
app.use("/api/subcategory", subCategoryRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use('/api/order', orderRouter)

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT)
    })
})
