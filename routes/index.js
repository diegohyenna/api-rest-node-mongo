const express = require('express')
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/' , auth, (req, res) => {
  console.log(res.locals.auth_data)
  return res.status(401).send("Só usuários autenticados podem ver isso aqui!")
})

module.exports = router;