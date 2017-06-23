<template>
    <div class="c-form">
        <div class="c-form-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    let Validation = require('../../libs/validation')
    export default {
        name: 'TqForm',
        props: {
            model: String,
            data: Object
        },
        data () {
            return {
                items: {} //具有name属性的tq-form-item子组件
            }
        },
        mounted () {

        },
        methods: {
            validate (callback) {
                let children = this.$children
                let items = {}
                for (let child of children) {
                    if (child.name)
                        items[child.name] = child
                }
                let validation = new Validation(this.model, this.data)
                let results = []
                for (let fieldName in items) {
                    let validResult = validation.validateField(fieldName, items[fieldName].label).then(messages => {
                        items[fieldName].errorMessage = ''
                        if (messages.length > 0) {
                            if ('string' === typeof messages[0]) { //本地验证结果
                                items[fieldName].errorMessage = messages.join()
                                return Promise.resolve(false)
                            } else { //远程验证结果
                                console.warn('远程验证失败，接口服务器返回结果尚未联调')
                            }
                        }
                        return Promise.resolve(true)
                    })
                    results.push(validResult)
                }
                Promise.all(results).then(results => {
                    let valid = true
                    for (let result of results) {
                        if (false === result) {
                            valid = false
                        }
                    }
                    callback(valid)
                })
            }
        }
    }
</script>