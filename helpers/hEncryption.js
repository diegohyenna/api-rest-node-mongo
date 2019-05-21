const bcrypt = require('bcrypt')

const hEncryption = {

  hashGenerate: function(word){
    
    return new Promise( (resolve, reject) => {
      bcrypt.hash(word, 10, async (error, encrypted) => {
        error ? reject(error) : "";
        encrypted ? resolve(encrypted) : reject(encrypted);
      })
    })

  }
}

module.exports = hEncryption