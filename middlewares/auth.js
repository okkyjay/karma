const { findOneAccount} = require('../services/sms/sms')
verifyAccount = async (req, res, next) => {
  try {
    const authId = req.headers?.auth_id
    const username = req.headers?.username
    if(authId && username){
      const query = {auth_id:authId, username:username}
      const account = await findOneAccount(query)

      if(account !== null){
          req.auth_id = authId
          next()
      }else {
          return res.status(403).send({
            status: 'false',
            message: 'Login to continue!',
            error: "Login to continue!",
            data:[]
          })
        }
    }else{
      return res.status(403).send({
        status: 'false',
        message: 'Auth Id and Username is required',
        error: "Auth Id and Username is required",
        data:[]
      })
    }
  } catch (error) {
    return res.status(403).send({
      status: false,
      message: error.message,
      error: "unknown failure"
    })
  }
}
const authJwt = {
    verifyAccount
  }
  module.exports = authJwt