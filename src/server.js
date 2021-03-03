const express = require('express');
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || '3001'

app.use(cors())
app.use(express.json())

//  ROUTERS
const inputRouter = require('./routers/InputRouter')
app.use(inputRouter)

app.listen(PORT, console.log(`RUNNING ON PORT:${PORT}`))


