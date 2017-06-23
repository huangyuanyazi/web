/**
 * art-template过滤器
 * Created by Wangxy on 2017/6/19.
 */
let moment = require('moment')

module.exports = {
    
    valueIDQueryName (key,jsonStr) {
        let obj = jsonStr
        let name="";
         // console.log(obj)
        for (var i = 0; i < obj.length; i++) {
            if(!key || obj[i].id!=key){
                name="全部";
            }else{
                name=obj[i].name
                break;
            }
        }
        return name
    },
    valueQuery (jsonStr, key) {
        // console.log(jsonStr)
        // console.log(typeof jsonStr)
        let obj = jsonStr
        return obj[key]
    },
    valueLabelQuery (jsonStr, key, metaJsonStr) {
        let obj = jsonStr
        let metaObj = metaJsonStr
        return metaObj[key]['in'] ? metaObj[key]['in'][obj[key]] : ''
    },
    dateFormat (timestamp, format) {
        if(!format) format = 'YYYY-MM-DD HH:mm'
        return moment(timestamp * 1000).format(format)
    }
}