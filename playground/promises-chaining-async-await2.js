require('../src/db/mongoose')
const Task = require('../src/models/task')

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: true})
    return count
}    

deleteTaskAndCount('603631c63ed27609a48fb04f').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})
