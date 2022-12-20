import cors from 'cors'
import express from 'express'
import { Post, thisMonth, thisWeek, today } from '../posts'

const app = express()
app.use(cors())

const allPosts = [today, thisWeek, thisMonth]

app.get('/posts', (req, res) => {
    res.json(allPosts)
})

app.post<{}, {}, Post> ('/posts', (req, res) => {
    console.log(req);
    
    const post = {...req.body, id: (Math.random()*100000).toFixed()}
    allPosts.push(post)
    res.json(post)
})

app.listen(8000,  ()=> {
    console.log('tha toi ra port 8000');
    
})