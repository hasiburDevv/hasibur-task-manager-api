const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!', undefined)
        callback(undefined, [1, 4, 7])
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error)
    }

    console.log(result)
})

//example
//example

const add = (num1, num2, callback) => {
    setTimeout(() => {
        callback(num1 + num2)
    }, 1000)
}

add(1, 4, (sum) => {
    console.log(`1 sec later ${sum}`);
})
