const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { requestLogger } = require('../utils/middleware')
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  
  if(username.length < 3 || password.length < 3 ){
     
    const error = new Error('username and password must be at least 3 characters long')
    error.name = 'ValidationError' 
    return next(error)  

  }
  else{

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
}
})
usersRouter.get('/', async (request, response) => {
    
    const users = await User
    .find({}).populate('blogs',{url:1, title: 1,author:1, id:1})
        response.json(users)

})

module.exports = usersRouter