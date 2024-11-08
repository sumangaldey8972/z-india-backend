const express = require("express")
const cors = require("cors")
const session = require("express-session")
const dotenv = require("dotenv")
const mongoStore = require("connect-mongo")
const { app_configuration } = require("./config/app.config")
const connect_mongodb = require("./connections/mongo.connection")
const { serverRoutes, authRoutes, sessionRoutes } = require("./routes/common")

function setupMiddleware(app) {
    dotenv.config()
    app.use(express.json({ limit: "1024mb" }))
    app.use(cors({ origin: true, credentials: true }))
    app.use(express.urlencoded({ extended: true }))
    app.use(
        session({
            secret: app_configuration.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: { sameSite: "lax", maxAge: 1 * 60 * 60 * 10000 },
            store: new mongoStore({ mongoUrl: app_configuration.MONGO_DETAILS })
        })
    )
}


function setupRoutes(app) {
    app.use('/', serverRoutes)
    app.use('/auth', authRoutes)
    app.use('/session', sessionRoutes)
}


const app = express()
setupMiddleware(app)
setupRoutes(app)



connect_mongodb().then(() => {
    app.listen(app_configuration.PORT, () => {
        console.log(`Server started at PORT - ${app_configuration.PORT}`)
    })
}).catch(() => {
    console.log('could not start the server')
})