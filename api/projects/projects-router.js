// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const Post = require('./projects-model')


router.get('/', (req, res, next) => {
    Post.get()
    .then(posts => {
        res.json(posts)
    })
    .catch(next)
})


router.get('/:id', (req, res, next) => {
    Post.get(req.params.id)
        .then(post => {
            if(post) {
                res.json(post)
            } else {
                res.status(404).json({
                    message: 'No project with desired ID'
                })
            }
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Post.insert({name: req.body.name, description: req.body.description})
        .then(newPost => {
            if(newPost){
            res.status(201).json(newPost)
            } else {
                res.status(400).json({
                    message: 'Variable data missing'
                })
            }
            
        })
        .catch(next)
})


router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'Not exactly what im looking for',
      message: err.message,
      stack: err.stack
    })
  }) 

module.exports = router

