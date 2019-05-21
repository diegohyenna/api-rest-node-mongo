const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hEncryption = require('../helpers/hEncryption') 

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false //isso faz com que o campo nao seja mostrado em um "select * from tabela"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date
  },
})

//um middleware antes para criptografar a senha
User.pre('save', async function(next){
  let user = this;

  if(!user.isModified('password')){
    return next();
  }

  let newPassword = await hEncryption.hashGenerate(user.password)
  user.password = newPassword;
  next()


})

module.exports = mongoose.model("User", User)