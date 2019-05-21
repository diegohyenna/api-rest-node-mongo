const jwt = require('jsonwebtoken')
const config = require('../config/config')

const auth = (req, res, next) => {
  const token_header = req.headers.auth;

  console.log(req.headers)



  if(!token_header){
    return res.status(400).send({error: 'Autenticação recusada!'})
  }

  jwt.verify(token_header, config.jwt_password, (error, decoded) => {
    if(error){
      return res.status(401).send({error: "Token inválido!"})
    }

    res.locals.auth_data = decoded;

    return next();
  })
}

module.exports = auth;