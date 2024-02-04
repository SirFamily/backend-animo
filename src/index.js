require('dotenv').config()
const cors = require("cors");
const express = require("express")
const notFoundHanlder = require("./middlewares/notFound")
const authRoute = require("./routers/auth-route")
const hostRoute = require("./routers/host-route")
const userRoute = require("./routers/user-route")
const petRoute = require("./routers/Pet-route")
const roomRoute = require("./routers/room-route")
const bookRoute = require("./routers/booking-route")
const errorHandler = require("./middlewares/error")
const app = express()

const cre = `░█▀▀░█▀▄░█▀▀░█▀█░▀█▀░█▀▀░█▀▄░░░█▀▄░█░█
░█░░░█▀▄░█▀▀░█▀█░░█░░█▀▀░█░█░░░█▀▄░░█░
░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░░▀▀▀░▀▀░░░░▀▀░░░▀░`
const str = `░█▀▀░▀█▀░█▀▄░█▀▀░█▀█░█▄█░▀█▀░█░░░█░█
░▀▀█░░█░░█▀▄░█▀▀░█▀█░█░█░░█░░█░░░░█░
░▀▀▀░▀▀▀░▀░▀░▀░░░▀░▀░▀░▀░▀▀▀░▀▀▀░░▀░`
const line =`░▀▄░░▀▄░░▀▄░░▀▄░░▀▄░░░▄▀░░▄▀░░▄▀░░▄▀░░▄▀
░░▄▀░░▄▀░░▄▀░░▄▀░░▄▀░▀▄░░▀▄░░▀▄░░▀▄░░▀▄░
░▀░░░▀░░░▀░░░▀░░░▀░░░░░▀░░░▀░░░▀░░░▀░░░▀`

app.use(cors())
app.use(express.json())
//ยังไม่เสร็จ
app.use("/auth",authRoute)
app.use('/p',userRoute)
app.use('/p/user/pet',petRoute)
app.use('/p/user/host/room',roomRoute) //สร้างห้อง
app.use("/host",hostRoute) //สร้าง host
app.use("/booking",bookRoute)

app.use("*", notFoundHanlder)
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => {
    console.log(line)
    console.log(cre)
    console.log(str)
    console.log(line)
    console.log("----------------------------------------")
    console.log("  Server Run On" + " http://localhost:" + port)
    console.log("----------------------------------------")
})