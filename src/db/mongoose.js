//windows!! C:/Users/Hasibur1/mongodb/bin/mongod.exe --dbpath=C:/Users/Hasibur1/mongodb-data
//linux!! /home/linux/software/mongodb/bin/mongod --dbpath=/home/linux/software/mongodb-data
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    //useFindAndModify: false,
    useCreateIndex: true
})