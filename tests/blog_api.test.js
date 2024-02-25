const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Blog about nothing',
    author: 'Collin McDouglass',
    url: 'https://closedblog.com',
    likes: 25
  },
  {
    title: 'Blog about everything',
    author: 'Andy McKeyncy',
    url: 'https://openblog.com',
    likes: 35
  },
  {
    title: 'Blog about likes',
    author: 'Darrin Lloyd',
    url: 'https://reality.com',
    likes: 15
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
}, 100000)

test('bloges are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
    expect(response.status).toEqual(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
},100000)

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  console.log('Returned blogs', response.body)
  const ids = response.body.map((blog) => blog.id)
  ids.forEach((id) => {
    expect(id).toBeDefined()
  })
},100000)

test('the likes property is missing from the request, it will default to the value 0', async () => {
  
  const newBlog = {
    title: 'Blog about new thing',
    author: 'Collin McDouglass',
    url: 'https://openblog.com'
  }
  await Blog.deleteMany({})
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(1)
  
    expect(response.body[0].likes).toBe(0)

},10000)

test('/api/blogs URL successfully creates a new blog post', async () => {
  
  const newBlog = {
    title: 'Blog about new thing',
    author: 'Collin McDouglass',
    url: 'https://openblog.com',
    likes: 45
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  
    expect(titles).toContain('Blog about new thing')

},10000)

test(' if the title or url properties are missing from the request data, the backend responds to the request with'+
'the status code 400 Bad Request', async () => {
  
  const newBlogNoTitle = {
    author: 'Collin McDouglass',
    url: 'https://openblog.com',
    likes: 44
  }

  const newBlogNoAuthor = {
    title: 'Awesome day',
    url: 'https://openblog.com',
    likes: 44
  }
  
  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)
  
  await api
    .post('/api/blogs')
    .send(newBlogNoAuthor)
    .expect(400)
   
    
},50000)


test('a blog can be deleted', async () => {
  const response = await api.get('/api/blogs')
  const allBlogs = response.body
  const blogToDelete = allBlogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const responseAfterDeletion = await api.get('/api/blogs')
  const blogsCorrected = responseAfterDeletion.body

  const titles = blogsCorrected.map(r => r.title)
  expect(titles).toHaveLength(allBlogs.length -1)
  
  expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
  const response = await api.get('/api/blogs')
  const allBlogs = response.body
  const blogToUpdate = allBlogs[0]
  const updatedId = blogToUpdate.id
  blogToUpdate.title = 'Updated Blog'
  blogToUpdate.likes = 222
  console.log('Blog to Update', blogToUpdate)
  await api
    .put(`/api/blogs/${updatedId}`)
    .send(blogToUpdate)
    .expect(201)

  const responseAfterUpdating = await api.get('/api/blogs')
  const blogsCorrected = responseAfterUpdating.body

  const updatedBlog = blogsCorrected.find(blog=>blog.title==='Updated Blog');
  expect(updatedBlog).toBeTruthy()
  expect(updatedBlog.likes).toEqual(222)
},100000)

afterAll(async () => {
  await mongoose.connection.close()
})