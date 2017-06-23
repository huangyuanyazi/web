/**
 * Created by john on 2017/4/5.
 */
let router = require("express").Router()
let faker = require("faker")
// let xmlrequest = require('navagitor')
faker.locale = "zh_CN"
// router.get("/patentss", function (request, response, next) {
//     let data = []
//     for (let i = 0; i < 5; i++) {
//         data.push({
//             id: i,
//             patent_header: faker.name.title(),
//             patent_price: faker.random.number(),
//             patent_describ: faker.name.jobDescriptor(),
//             patent_type: faker.name.jobType(),
//             patent_company: faker.company.companyName(),
//         })
//     }
//     // var xhr=new XMLHttpRequest();
//     // xhr.open( "POST", "http://192.168.1.126:9093/patents" );
//     // xhr.send(JSON.stringify(data));
//     // console.log(xmlrequest)
//     console.log(request)
//     response.json(data)
// })
// router.post('/patents',function (req, res, next) {
//     // 打印post请求的数据内容
//     let data = []
//     for (let i = 0; i < 5; i++) {
//         data.push({
//             id: i,
//             patent_header: faker.name.title(),
//             patent_price: faker.random.number(),
//             patent_describ: faker.name.jobDescriptor(),
//             patent_type: faker.name.jobType(),
//             patent_company: faker.company.companyName(),
//         })
//     }
//     res.send(Json.stringify(data));
// });
// router.get("/patents/:id", function (request, response, next) {
//     let data = {}
//     data.patent = {
//         patent_header: faker.name.title(),
//         patent_price: faker.random.number(),
//         patent_describ: faker.name.jobDescriptor(),
//         patent_type: faker.name.jobType(),
//         patent_company: faker.company.companyName(),
//     }
//     response.json(data)
// })

module.exports = router