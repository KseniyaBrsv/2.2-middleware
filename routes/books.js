const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()
const fileMulter = require('../middleware/file')
class Book {
  constructor (
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    fileBook = '',
    id = uuid()
  ) {
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
    this.fileBook = fileBook
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
router.post('/',
  fileMulter.single('fileBook'),
  (req, res) => {
    const { book } = stor
    const {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
    } = req.body

    let file = ''
    if (req.file) {
      const { path } = req.file
      file = path
    }

    const newBook = new Book(title, description,
      authors,
      favorite,
      fileCover,
      fileName,
      file
    )

    book.push(newBook)

    res.status(201)
    res.json(newBook)
  })

// редактировать книгу по ID
router.put('/:id',
  fileMulter.single('fileBook'),
  (req, res) => {
    const { book } = stor
    const {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
    } = req.body

    let file = ''
    if (req.file) {
      const { path } = req.file
      file = path
    }

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
        fileName,
        file
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

// скачиваение файла по id
router.get('/:id/download', (req, res) => {
  const { book } = stor
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    const bookToDownload = book[idx]
    const file = bookToDownload.fileBook
    if (file) {
      res.download(file)
    } else {
      res.status(404)
      res.json('File not found')
    }
  } else {
    res.status(404)
    res.json('Code: 404')
  }
})

module.exports = router
