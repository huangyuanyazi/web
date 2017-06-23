/**
 * Created by john on 2017/4/5.
 */
let router = require("express").Router()
let faker = require("faker")

faker.locale = "zh_CN"

router.get("/items", function(request, response, next) {
    let data = []
    for (let i = 0; i < 5; i++) {
        data.push({
            id: i,
            clickUrl: faker.image.imageUrl(),
            desc: faker.database.column(),
            image: faker.image.image()
        })
    }
    
    response.json(data)
})

router.get("/items/:id", function(request, response, next) {
    let data = {}
    data.item = {
        name: faker.name.title(),
        price: faker.random.number()
    }

    response.json(data)
})


module.exports = router


