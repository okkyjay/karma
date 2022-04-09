const { findOneAccount, findOnePhoneNumber} = require('../services/sms/sms')
const { requestValidation} = require('../services/validation/validation')
const Redis = require('redis')
require('dotenv').config()

const redisClient = Redis.createClient({url:process.env.REDIS_URL})

exports.inbound = async (req, res) => {
    
    try {
        // Validation
        const { error } = requestValidation(req.body)

        if (error) {
            return res.status(403).send({
              status: 'false',
              error: error.details[0].message,
              message: ""
            })
          }


        const { from, text, to} = req.body
        // Check if the to number is present
        
        const auth_id = req.auth_id
        const account = await findOneAccount({auth_id:auth_id})
    
        const toNumberExist =  await findOnePhoneNumber({account_id:account.id, number:to})

        if(toNumberExist === null){
            return res.status(403).send({
                status: 'false',
                error: `${to} parameter not found`,
                message: ""
              })
        }

        if(text.includes("STOP") || text.toString().toLowerCase().includes("stop")){
            const expiration = 3600 * 4
            let data = {from:from,to:to} 
            redisClient.setEx(`${to.from}`, expiration, JSON.stringify(data))
        }
        return res.status.send({
            status: true,
            message: "inbound sms ok",
            error:""
        })
    } catch (error) {
        return res.status(403).send({
            status: "false",
            message: "",
            error: "unknown failure"
        })   
    }   
}

exports.outbound = async (req, res) => {
    try {
            // Validation
    const { error } = requestValidation(req.body)

    if (error) {
        return res.status(403).send({
            status: 'false',
            error: error.details[0].message,
            message: ""
        })
    }

    const { from, text, to} = req.body

    // If the pair ‘to’, ‘from’ matches any entry in cache (STOP)
    redisClient.get(`${to.from}`, async( error, hit) => {
        if(error) console.log(error)
        if(hit !== null){
            return res.status(403).send({
                status: 'false',
                error: `sms from ${from} to ${to} blocked by STOP request`,
                message: ""
              })
        }else{
            // Check if the to number is present
        
            const auth_id = req.auth_id
            const account = await findOneAccount({auth_id:auth_id})
    
            const toNumberExist =  await findOnePhoneNumber({account_id:account.id, number:from})

            if(toNumberExist === null){
                return res.status(403).send({
                    status: 'false',
                    error: `${from} parameter not found`,
                    message: ""
                })
            }

            redisClient.get(`outbound.${tfrom}`, async( error, limit) => {
                if(limit !== null && parseInt(limit) > 50){
                    return res.status(403).send({
                        status: 'false',
                        error: `limit reached for from  ${from}`,
                        message: ""
                      })
                }else{
                    const expiration = 3600 * 24
                    limit = limit || 0
                    limit = parseInt(limit) + 1 
                    redisClient.setEx(`outbound.${from}`, expiration, limit)

                    return res.status.send({
                        status: true,
                        message: "outbound sms ok",
                        error:""
                    })
                }
            })
        }
    })
    } catch (error) {
        return res.status(403).send({
            status: "false",
            message: "",
            error: "unknown failure"
        })
    }
}
