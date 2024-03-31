const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  const login = { id: 1, mail: 'test@mail.ru' }

  res.status(201)
  res.json(login)
})

module.exports = router
