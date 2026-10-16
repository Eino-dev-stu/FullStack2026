const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { requestLogger,tokenExtractor } = require('../utils/middleware')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user',{username:1, name:1})
    response.json(blogs)
  
})

blogsRouter.post('/', async (request, response, next) => {
    console.log("token")
    
  const body = request.body
  //const user = await User.findById(body.user)
   //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
   const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log("token",decodedToken)
  
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  else if(!body.title || !body.url) {
    return response.status(400).end()
  }

  else if(body.likes == undefined) {
    body.likes = 0
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user:user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
  
})
blogsRouter.put('/:id', async (request, response, next) => {
    Blog.findById(request.params.id)
        .then((blog) => {
            if(!blog){
                return response.status(404).end()
            }
            blog.likes = request.body.likes ?? blog.likes
            blog.author = request.body.author ?? blog.author
            blog.title = request.body.title || blog.title
            blog.url = request.body.url || blog.url
            

            return blog.save()
                .then((updatedBlog)=> {
            response.json(updatedBlog)
        })
        }).catch((error) => next(error))
})
blogsRouter.delete('/:id',async (request, response,next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})




module.exports = blogsRouter