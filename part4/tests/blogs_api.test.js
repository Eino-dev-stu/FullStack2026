const { test, after,describe,beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const testHelper =require('./testHelper')
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
describe('testing api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
  })

    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

test('right amount of blogs returned',async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
})

test('blogs have id field', async () => {
    const response = await api.get('/api/blogs')
    
    
    for (let i = 0; i < response.body.length; i++) {
    //assert.ok(Object.hasOwn(response.body[i], 'id'))
        assert.notStrictEqual(
        response.body[i].id, 
        undefined, 
        `Item at index ${i} is missing the "id" property`);
    }
    })

test('POST adds a blog', async () => {
    
    const newBlog = ({
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
   })

   await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
   
    const dataAfter = await testHelper.blogsInDb()
    assert.strictEqual(dataAfter.length, 3)

})

test('POST adds blog with correct content', async () => {
    const newBlog = ({
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
   })

   const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

   delete result.body.id
   assert.deepStrictEqual(result.body,newBlog)
})
    test('Missing field "likes" becomes 0', async ()=> {
         const newBlog = ({
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
   })
   const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(result.body.likes, 0)

    })
    test('missing "url"  returns 400', async ()=> {
        const newBlog = ({
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 11
   })   
        
        const result = await api
             .post('/api/blogs')
             .send(newBlog)
             .expect(400)
            
     })

    test('missing "title" returns 400', async ()=> {
        const newBlog = ({
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 11
   })   
        
        const result = await api
             .post('/api/blogs')
             .send(newBlog)
             .expect(400)
     })

      test('Updating field "likes" works', async ()=> {
        const response = await api.get('/api/blogs')
        const payload = ({
            likes: 66
        })
        
        const result = await api
            .put(`/api/blogs/${response.body[0].id}`)
            .send(payload)
        const responseOne = await api.get(`/api/blogs/${response.body[0].id}`)
    
        assert.strictEqual(responseOne.body.likes, result.body.likes)
    })
    test('deleting blog from DB works', async ()=> {
        const response = await api.get('/api/blogs')
        const result = await api
            .delete(`/api/blogs/${response.body[0].id}`)
            .expect(204)
        
        
        const responseAfter = await api.get('/api/blogs')
        
        assert.strictEqual(responseAfter.body.length, response.body.length -1)
    })

})
   

after(async () => {
  await mongoose.connection.close()
})