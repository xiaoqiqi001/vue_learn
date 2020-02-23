let express = require('express')

let app = express()

app.get('/user', (req, res) => {
  res.json({
    name: 'littlenew'
  })
})

app.listen(3001)
