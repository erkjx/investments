require('dotenv').config()
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const investmentRoutes = require('./routes/investments')
const commentRoutes = require('./routes/comments')

const express = require('express')
const app = express()
const cors = require('cors')
//middleware
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8080
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use('/investments', investmentRoutes);
app.use('/comments', commentRoutes);


app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))

const connection = require('./db')
connection()