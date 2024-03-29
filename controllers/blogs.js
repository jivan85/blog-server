const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

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
  /*const decodedToken = jwt.verify(request.token, process.env.SECRET)
  logger.info("decodedToken", decodedToken)
  if (!decodedToken||!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }*/
  if(!request.user){
    return response.status(401).json({ error: 'token invalid' })
  }
  console.log('User Id: ',request.user)
  const user = await User.findById(request.user)
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
  
  /*const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken||!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  */
  if(!request.user){
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).json({ error: 'record hasn\'t been found' })
  }
  logger.info("Blog", blog)
  logger.info("Extracted User Id", request.user)
  if(blog.user.toString()===request.user){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()}
    else{
      return response.status(401).json({ error: 'only blog\s creator can delete record' })
    }
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