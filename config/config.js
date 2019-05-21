const env = process.env.NODE_ENV || 'dev'

const config = () => {
  switch (env) {
    case 'dev':
      
      return{
        db_url: "mongodb://localhost/estudo-api-node-mongo",
        jwt_password: "diegohyenna",
        jwt_expired: '24h'
      }
  
    case 'hml':

      return {
        db_url: "mongodb://localhost/estudo-api-node-mongo"
      }

    case 'prod':

      return {
        db_url: "mongodb://localhost/estudo-api-node-mongo"
      }

    default:
      break;
  }
}

console.log("Iniciando a api em ambiente ", env.toUpperCase())

module.exports = config()