const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, current)=> sum + current.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev,current) => (prev && prev.likes > current.likes ? prev : current))
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const authorToBlogsMap = new Map()
    blogs.forEach(element => {
        if(authorToBlogsMap.has(element.author)){
            authorToBlogsMap.set(element.author,authorToBlogsMap.get(element.author)+1)
        }
        else authorToBlogsMap.set(element.author,1)
    });
    let mostBlogsAuthor = {
        author: '',
        blogs: 0
    };
    authorToBlogsMap.forEach((value, key) => {
        if(value>mostBlogsAuthor.blogs){
            mostBlogsAuthor.author = key
            mostBlogsAuthor.blogs = value
        }
    })

    return mostBlogsAuthor
}

const mostLikes = (blogs) => {
    const authorToBlogsMap = new Map()
    blogs.forEach(element => {
        if(authorToBlogsMap.has(element.author)){
            authorToBlogsMap.set(element.author,authorToBlogsMap.get(element.author)+element.likes)
        }
        else authorToBlogsMap.set(element.author,element.likes)
    });
    let mostLikesAuthor = {
        author: '',
        likes: 0
    };
    authorToBlogsMap.forEach((value, key) => {
        if(value>mostLikesAuthor.likes){
            mostLikesAuthor.author = key
            mostLikesAuthor.likes = value
        }
    })

    return mostLikesAuthor
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }