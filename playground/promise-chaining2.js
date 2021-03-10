require('../src/db/mongoose.js')
const Task = require('../src/models/task')

Task.findByIdAndRemove('6037210c3d0bab3d64d041cc').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: true})
}).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})