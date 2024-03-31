const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()

class Book {
  constructor (
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    id = uuid()
  ) {
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
    this.id = id
  }
};

const stor = {
  book: [
    new Book(),
    new Book()
  ]
}

// получить все книги
router.get('/', (req, res) => {
  const { book } = stor
  res.json(book)
})

// получить книгу по ID
router.get('/:id', (req, res) => {
  const { book } = stor
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    res.json(book[idx])
  } else {
    res.status(404)
    res.json('Code: 404')
  }
})

// создать книгу
router.post('/', (req, res) => {
  const { book } = stor
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  } = req.body

  const newBook = new Book(title, description,
    authors,
    favorite,
    fileCover,
    fileName)
  book.push(newBook)

  res.status(201)
  res.json(newBook)
})

// редактировать книгу по ID
router.put('/:id', (req, res) => {
  const { book } = stor
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  } = req.body
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    book[idx] = {
      ...book[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
    }

    res.json(book[idx])
  } else {
    res.status(404)
    res.json('Code: 404')
  }
})

// удалить книгу по ID
router.delete('/:id', (req, res) => {
  const { book } = stor
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    book.splice(idx, 1)
    res.json('ok')
  } else {
    res.status(404)
    res.json('Code: 404')
  }
})

module.exports = router
