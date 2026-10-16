const { test, after,describe,beforeEach } = require('node:test')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const mongoose = require('mongoose')
const testHelper =require('./testHelper')
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
describe('testing user Api', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root',name:"John", passwordHash })

    await user.save()
  })
  test('creation succeeds with a fresh username', async () => {
     
    const usersAtStart= await User.find({})
   

    const newUser = {
      username: 'testuser1',
      name: 'testName',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    
    const usersAtEnd= await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    console.log('usernames',usernames)
    assert(usernames.includes(newUser.username))
  })
  test('If USERNAME formatted wrong user creation fails',async ()=>{
    const usersAtStart= await User.find({})
    const newUser = {
      username: 'te',
      name: 'testName',
      password: 'salainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd= await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('username and password must be at least 3 characters long'))
  })
  test('If PASSWORD formatted wrong user creation fails',async ()=>{
    const usersAtStart= await User.find({})
    const newUser = {
      username: 'tess',
      name: 'testName',
      password: 'sa',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd= await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length )
    assert(result.body.error.includes('username and password must be at least 3 characters long'))
  })
  test('Username must be unique', async ()=> {
    const usersAtStart= await User.find({})
    const newUser = {
     username: 'root',
     name: 'testName',
     password: 'salainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
    const usersAtEnd= await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length )
    assert(result.body.error.includes('expected `username` to be unique'))
    
  
  })

})
after(async () => {
  await mongoose.connection.close()
})