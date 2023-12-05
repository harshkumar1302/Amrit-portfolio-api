const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const skillRouter = require('./routers/skill')
const aboutRouter = require('./routers/about')
const projectRouter = require('./routers/project')
const achievementRouter = require('./routers/achievement')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(userRouter)
app.use(skillRouter)
app.use(aboutRouter)
app.use(projectRouter)
app.use(achievementRouter)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to my Portflio Server App!</h1>')
})


app.listen(port, () => {
    console.log('Server is started at ' + port)
})
