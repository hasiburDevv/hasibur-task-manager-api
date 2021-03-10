
const express = require('express')
require('../src/db/mongoose')

const Task = require('../src/models/task')
const User = require('../src/models/user')

const main = async () => {
    // const task = await Task.findById('6043d0cccc75ce27ab2b2662')
    // await task.populate('owner').execPopulate()
    // console.log(task);

    const user = await User.findById('6043c9f285a75e21c022b732')
    await user.populate('tasks').execPopulate()
    
    console.log(user.tasks)
}

main()
