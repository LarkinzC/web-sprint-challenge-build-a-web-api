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
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({
                    message: 'Unknown post ID'
                })
            }
        })
        .catch(err => {
            err.status(400)
            next(err)
        });
});


router.post('/', (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            message: 'Unknown ID'
        });
    }
    Post.insert({ name: req.body.name, description: req.body.description, completed: true })
        .then(newPost => {
            console.log(req.body.name, req.body.description)
                res.status(201).json(newPost);
            
        })
        .catch(next);
});

router.put('/:id', (req, res, next) => {
        if(!req.params.id) {
            res.status(400).json({
                message: 'no project with ID found'
            })
        }
        if (!req.body.name || !req.body.description || req.body.completed === undefined ) {
            res.status(400).json({
                message: 'Unknown ID'
            });
        }
    Post.update(req.params.id, req.body)
        .then(updatedPost => {
           res.json(updatedPost)
        })
        .catch(next)
})


router.delete('/:id', (req, res, next) => {
    Post.remove(req.params.id)
    .then(post => {
        if (!post) {
            // Post with the specified ID does not exist
            return res.status(404).json({
                message: 'No project with such ID'
            });
        }
        // Post with the specified ID exists, proceed with deletion
        return Post.remove(req.params.id);
    })
    .then(numOfRecordsDeleted => {
        // Successful deletion
        res.status(200).json({
            numOfRecordsDeleted: numOfRecordsDeleted,
            message: 'Project deleted'
        });
    })
    .catch(next);
});


router.get('/:id/actions', (req, res, next) => {
    Post.getProjectActions(req.params.id)
        .then(actions => {
            console.log(actions)
            if(!actions) {
                res.status(404).json([])
            } else{
                res.json(actions)
            }
        }) .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    console.error(err)
    res.status(err.status || 500).json({
      customMessage: 'Not exactly what im looking for',
      message: err.message,
      stack: err.stack
    })
  }) 

module.exports = router

