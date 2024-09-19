
const express = require('express');
const bodyParser = require('body-parser')
let db = require('./models')
let cors = require('cors')
const user_router = require('./routes/user')
const task_router = require('./routes/task')
const {auth} = require('./middleware/auth')

const app =express();
const expressSwagger = require('express-swagger-generator')(app);
const morgan = require('morgan')
const swaggerOptions=require('./config/swagger')

expressSwagger(swaggerOptions)
app.use(morgan('tiny'))

app.use(bodyParser.json())
app.use(cors())
// here we add the routes for user and task controllers
// for the task controller we add the auth middleware to authenticate the user token 
app.use('/user', user_router)
app.use('/task', auth, task_router)

db.sequelize.sync().then((req)=> {
    app.listen(process.env.PORT||4000,()=>{
        console.log('server is running port : 4000')
    })
})

module.exports = app;