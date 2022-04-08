const express = require('express')
const smsRoutes = require('./sms/sms')


const app = express()

app.use(smsRoutes)

app.all('*', (req, res) => {
    res.status(405).send({
      status: 405,
      err: 'Sorry! cant find that'
    })
  })

  app.use((req, res, next) => {
    res.headers('Access-Control-Allow-Origin', '*')
    res.headers('Access-Control-Allow-Headers', '*')
    res.headers('Content-Type', 'application/json')
    if (req.method === 'OPTIONS') {
      res,
      headers(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST,PATCH, DELETE, HEAD'
      )
    }
    next()
  })
  module.exports = app