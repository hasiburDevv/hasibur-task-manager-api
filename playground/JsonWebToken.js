
const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({_id: 'abcd1234'}, 'thisArgumentIsCalledSecret', {expiresIn: '1 days'})
    console.log(token)

    const data = jwt.verify(token, 'thisArgumentIsCalledSecret')
    console.log(data)
}

myFunction()