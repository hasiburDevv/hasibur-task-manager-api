require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('60362cd8e842a319a09f4d24', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})