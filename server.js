const express = require('express');
const routes = require('./routes/routes')

const app = express();
app.enable('trust proxy')
app.use(express.json({
    limit: '50mb',
    type: [
      'application/json',
      'text/plain'
    ]
  }))


  app.use(express.urlencoded({ extended: true }))
  app.use(routes)
  
  const port = process.env.PORT || 3080;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
  })
  module.exports = app