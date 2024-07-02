const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Rupali Marathe.')
})

app.listen(3000)