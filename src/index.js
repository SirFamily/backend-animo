require('dotenv').config()
const cors = require("cors");
const express = require("express")
const notFoundHanlder = require("./middlewares/notFound")
const authRoute = require("./routers/auth-route")
const hostRoute = require("./routers/host-route")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth",authRoute)

app.use("/create",hostRoute)

app.use("*", notFoundHanlder)

const port = process.env.PORT
app.listen(port, () => {
    console.log("server run on" + " " + port)
})