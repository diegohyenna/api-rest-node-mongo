const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const config = require('./config/config')

//Database
const base_url = config.db_url
const options = { 
  useNewUrlParser: true,
  useCreateIndex: true
}

mongoose.connect(base_url, options)
mongoose.connection.on('error', (error) => {
  console.log("erro na conexão com banco de dados!")
  console.log(error)
})
mongoose.connection.on('connected', () => {
  console.log("Aplicação conectada ao banco de dados!")
})
mongoose.connection.on('disconnected', () => {
  console.log("Aplicação desconectada do banco de dados!")
})


//Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Rotas
const indexRoute = require('./routes/index')
const userRoute = require('./routes/users')

app.use('/', indexRoute)
app.use('/users', userRoute)


//Server
app.listen(3000)


module.exports = app