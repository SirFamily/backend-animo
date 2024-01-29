require('dotenv').config()
const cors = require("cors");
const express = require("express")
const notFoundHanlder = require("./middlewares/notFound")
const authRoute = require("./routers/auth-route")
const hostRoute = require("./routers/createHost-route")
const userRoue = require("./routers/user-route")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth",authRoute)
app.use('/p',userRoue)
app.use("/host",hostRoute)

app.use("*", notFoundHanlder)

const port = process.env.PORT
app.listen(port, () => {
    console.log("server run on" + " " + port)
})