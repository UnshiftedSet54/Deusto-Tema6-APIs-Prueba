const express = require('express')
const app = express()
const PORT = process.env.PORT | 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hola desde el servidor!')
})

app.listen(PORT, () => {
  console.log('Server running at http://localhost:3000/')
})