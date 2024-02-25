const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe('favorite blog', () => {
    const blogList = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'The greehhouse gas impact',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 2,
        __v: 0
      },
      {
        _id: '6a422aa71b54a676234d17f8',
        title: 'What we know about sugar',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 13,
        __v: 0
      },
      {
        _id: '7a422aa71b54a676234d17f8',
        title: 'Texas law',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '8a422aa71b54a676234d17f8',
        title: 'Horizon of Knowledge',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 1,
        __v: 0
      }
    ]
  
    test('find a favorite blog', () => {
      const result = listHelper.favoriteBlog(blogList)
      expect(result).toEqual({
        title: "What we know about sugar",
        author: "Edsger W. Dijkstra",
        likes: 13
      })
    })
  })

  describe('most blogs author', () => {
    const blogList = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'The greehhouse gas impact',
        author: 'Fandy W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 2,
        __v: 0
      },
      {
        _id: '6a422aa71b54a676234d17f8',
        title: 'What we know about sugar',
        author: 'Mandy W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 13,
        __v: 0
      },
      {
        _id: '7a422aa71b54a676234d17f8',
        title: 'Texas law',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '8a422aa71b54a676234d17f8',
        title: 'Horizon of Knowledge',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 1,
        __v: 0
      }
    ]
  
    test('find an author with most blogs', () => {
      const result = listHelper.mostBlogs(blogList)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        blogs: 2
      })
    })
  })

  describe('most likes author', () => {
    const blogList = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'The greehhouse gas impact',
        author: 'Fandy W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 221,
        __v: 0
      },
      {
        _id: '6a422aa71b54a676234d17f8',
        title: 'What we know about sugar',
        author: 'Mandy W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 13,
        __v: 0
      },
      {
        _id: '7a422aa71b54a676234d17f8',
        title: 'Texas law',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 100,
        __v: 0
      },
      {
        _id: '8a422aa71b54a676234d17f8',
        title: 'Horizon of Knowledge',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 150,
        __v: 0
      }
    ]
  
    test('find an author with most likes', () => {
      const result = listHelper.mostLikes(blogList)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 250
      })
    })
  })