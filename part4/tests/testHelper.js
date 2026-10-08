const Blog = require('../models/blog')
const initialBlogs =[
    {
 
  title: 'bible',
  author: 'god',
  url: 'www.heaven.com',
  likes: 11
},
{
  
  title: 'bibleblack',
  author: 'devil',
  url: 'www.hell.com',
  likes: 666
},
]
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}
module.exports = {
    initialBlogs,blogsInDb
}
