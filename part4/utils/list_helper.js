

const blog = require('../models/blog')
const logger = require('../utils/logger')
const dummy = (blogs) => {
  return(1)
}

const totalLikes = (blogs) => {
    
    var totalLikes = blogs.reduce(function(sum,blog)
{
        return sum + blog.likes
},0)
    return totalLikes
}
const favoriteBlog = (blogs) => {
    var favorite = blogs.reduce(function(max, blog)
    {
        return blog.likes > max.likes ? blog : max
    },blogs[0])
    return favorite
}
const writerWithMost = (blogs) => {
    count = {}
    currentCount = 0
    maxCountName = {author:'',blogs:''} 
    for (const blog of blogs){
        const author = blog.author
    
        if (count[author]) {
            count[author] = count[author] + 1
        }else{
            count[author] = 1
        }
        if (count[author] > currentCount){
            //maxCountName = (blog.author,count[author])
            maxCountName.author = blog.author
            maxCountName.blogs = count[author]
        }
    }
    
    return maxCountName
}
const writerwithMostLikes = (blogs) => {
    newList = {}
    for (const blog of blogs){
        if(newList[blog.author]){
            logger.info('iterated blog likes',blog.author,blog.likes)
            newList[blog.author].likes = newList[blog.author].likes + blog.likes
        }
        else {
            logger.info(blog,'else blog')
            newList[blog.author] = { author:blog.author,
                likes:blog.likes
             }
            logger.info(newList)
            
        }
        
    }
    const blogArray = Object.values(newList)
    var reduceListToOne = blogArray.reduce(function(max, line)
    {
        return line.likes > max.likes ? line : max
    },blogArray[0])
    
    //logger.info('4.7test', reduceListToOne)
    return reduceListToOne
    

}
module.exports = {
  dummy, totalLikes,favoriteBlog,writerWithMost,writerwithMostLikes
}
