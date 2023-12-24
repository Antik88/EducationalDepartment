require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const router = require('./routes/index')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express()
const errorHendler = require('./middleware/ErrorHandlingMiddleware')

app.use(cors())
app.use(express.json())
app.use('/api', router)


app.use(errorHendler)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()