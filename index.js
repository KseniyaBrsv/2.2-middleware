const express = require('express')
const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const user = require('./routes/user')
const books = require('./routes/books')

const app = express()

app.use(logger)

// авторизация пользователя
app.use('/api/user', user)
// книги
app.use('/api/books', books)

app.use(error404)

const PORT = process.env.PORT || 3000
app.listen(PORT)
