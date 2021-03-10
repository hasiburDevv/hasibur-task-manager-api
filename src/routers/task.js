const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    //const tasks = new Task(req.body)
    const tasks = new Task({
        ...req.body,
        owner: req.user._id 
    })

    try{
        const task = await tasks.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    } 

    if (req.query.sortBy) {
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1] === 'desc' ? -1 : 1 
    } 
    
    try{
        //const task = await Task.find({ owner: req.user._id })

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
            }).execPopulate()

        res.send(req.user.tasks)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks/:id',auth, async (req, res) => {
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id })// task id, user id```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
        if(!task){
            return res.status(400).send()
        }
        
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send()
    }

    try{
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({ _id:req.params.id, owner: req.user._id })
        //const task = await Task.findOne({ _id:req.params.id, owner: req.user._id })

        
        if(!task){
            return res.status(400).send()
        }
        //await task.remove()
        res.send(task)
    }catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router