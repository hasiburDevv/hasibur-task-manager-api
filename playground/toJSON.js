const pet = {
    name: 'Mini',
    gender: 'male'
}

pet.toJSON = function () {
    return {}
}
console.log(JSON.stringify(pet));
