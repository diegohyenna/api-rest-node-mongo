const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth');

const User = require('../models/User')

const config = require('../config/config')

const createUserToken = (userId) => {
  return jwt.sign({id: userId}, config.jwt_password, {expiresIn: config.jwt_expired})
}


router.get('/' , auth, async (req, res) => {

  try {

    let users = User
      .find()
      .then( users => {
        return res.send({data: users})
      })
      .catch( error => {
        return res.status(500).send({message: "Erro na consulta dos usuários!"})
      })

  } catch(error) {
    return res.status(500).send({message: "Erro na consulta de dados!", error: error})
  }


  
})

router.post('/create', (req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).send({message: "Dados insuficientes!"})
  }

  User
    .findOne({email}) //JS já entende que é pra buscar pelo campo {email: email}
    .then( user => {
      if(user){
        res.send({error: "Já existe um usuário registrado nesse email!"})
      }else{
        let newUser = new User(req.body)
        newUser
          .save()
          .then( user => {
            if(user)
              return res.send({data: user, token: createUserToken(user._id)})

            return res.status(401).send({message: "Não foi possível criar um usuário", error: user})
          })
          .catch( error => {
            return res.status(401).send({message: "Não foi possível criar um usuário", error: error})
          })

      }
    })
    .catch( error => {
      return res.status(500).send({message: "Não foi possível criar um usuário", error: error})
    })

})

router.post('/auth', (req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).send({message: "Dados insuficientes!"})
  }

  User
    .findOne({email})
    .select('+password')
    .then( user => {
      if(user){

        bcrypt.compare(password.toString(), user.password.toString(), (error, same) => {
          if(!same){
            return res.status(400).send({message: "Email ou senha inválidos!"})
          }

          if(error){
            return res.status(401).send({message: "Erro, Não foi possível obter o usuário!", error: error})
          }

          delete user.password
          return res.send({data: user, token: createUserToken(user._id)})
        })

      }else{
        return res.status(400).send({message: "Não existe esse usuário!"})
      }

    })
    .catch( error => {
      return res.status(500).send({message: "Erro, Não foi possível obter o usuário", error: error})
    })
})

module.exports = router;