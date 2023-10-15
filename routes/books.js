/**
 * @swagger
 * components:
 *  schemas:
 *    Books:
 *      type: Object
 *      required:
 *        - titulo
 *        - autor
 *      properties:
 *        id:
 *          type: number
 *          description: identificador unico
 *        titulo:
 *          type: string
 *          description: titulo del libro
 *        autor:
 *          type: string
 *          description: autor del libro
 *      example:
 *        id: 4
 *        titulo: Invierte en ti
 *        autor: Natalia De Santiago
 */

/**
 * @swagger
 * tags:
 *  name: Books API
 *  description: Api para el manejo de libros
 * /Books:
 *    get:
 *      summary: lista de libros
 *      tags: [Books API]
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: 'json response {books: <array-books> | []}'
 *    post:
 *      summary: anadir libro
 *      tags: [Books API]
 *      requestBody:
 *        description: body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                titulo:
 *                  type: string
 *                autor:
 *                  type: string
 *      responses:
 *        200:
 *          description: 'json response {msg: "Anadido correctamente."}'
 *
 * /Books/{id}:
 *    get:
 *      summary: libro en especifico
 *      tags: [Books API]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *          required: true
 *          description: id libro
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: 'json response {books: <array-books> | []}'
 *        400:
 *          description: 'json response {msg: "Libro no encontrado."}'
 *    put:
 *      summary: actualizar libro
 *      tags: [Books API]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *          required: true
 *          description: id libro
 *      requestBody:
 *        description: body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                titulo:
 *                  type: string
 *                autor:
 *                  type: string
 *      responses:
 *        200:
 *          description: 'json response {msg: "Actualizado correctamente."}'
 *        400:
 *          description: 'json response {msg: "Libro no encontrado."}'
 *    delete:
 *      summary: borrar libro
 *      tags: [Books API]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *          required: true
 *          description: id libro
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: 'json response {msg: "Libro borrado existosamente."}'
 *        400:
 *          description: 'json response {msg: "Libro no encontrado."}'
 */

const express = require('express')
const app = express()

let books = [
  {id: 1, titulo: 'El mundo está en venta', autor: 'Javier Blas, Jack Farchy'},
  {id: 2, titulo: 'Un mundo feliz', autor: 'Aldous Huxley'},
  {id: 3, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry'}
]
const findBookIndex = (target, id) => target.findIndex(book => book.id === id)

app.get('/', (req, res) => {
  res.status(200).json({books})
})

app.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const filteredBook = books.filter(book => book.id === id)
  if(filteredBook.length === 0) return res.status(400).json({msg: 'Libro no encontrado.'})
  res.status(200).json({books: filteredBook})
})

app.post('/', (req, res) => {
  books = [...books, {id: books.length + 1, ...req.body}]
  console.log(books)
  res.status(200).json({msg: 'Anadido correctamente.'})
})

app.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const {titulo, autor} = req.body
  const index = findBookIndex(books, id)
  if(index === -1) return res.status(400).json({msg: 'Libro no encontrado.'})
  if(titulo) books[index].titulo = titulo
  if(autor) books[index].autor = autor
  res.status(200).json({msg: 'Actualizado correctamente.'})
})

app.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = findBookIndex(books, id)
  if(index === -1) return res.status(400).json({msg: 'Libro no encontrado.'})
  books.splice(index, 1)
  res.status(200).json({msg: 'Libro borrado existosamente.'})
})

module.exports = app

