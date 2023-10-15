const express = require('express')
const app = express()
const PORT  = process.env.PORT | 3000

const booksRoute = require('./routes/books')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Prueba - APIs',
      version: '1.0.0',
      description: 'Documentacion de APIs con swagger',
      contact: {
        name: 'Samuel Rosales',
        email: "example@gmail.com"
      }
    },
    servers: [{url: 'http://localhost:3000'}]
  },
  apis: ['./routes/books.js']
}
const swaggerSpecs = swaggerJsDoc(swaggerOptions)

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hola desde el servidor!')
})

app.use('/books', booksRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.listen(PORT, () => {
  console.log('Servidor corriendo en la direccion http://localhost:3000')
})