const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response, next) => {
    
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
  })

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log('TOKEN: ',request.token)
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
  }
  catch(error) {
    return response.status(401).json({ error: 'token invalid' })
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!body.title||!body.author){
    response.status(400).json({})
  }
  else{
    const blog = new Blog({ 
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id})
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = { 
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0}

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201).json(updatedNote)

})

module.exports = blogsRouter