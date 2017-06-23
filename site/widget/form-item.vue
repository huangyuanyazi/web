<template>
    <div class="c-form-item">
        <div class="c-form-item-label" :style="{width: labelWidth ? labelWidth : '80px'}">{{label}}</div>
        <div class="c-form-item-content">
            <slot></slot>
            <div class="c-form-item-error">{{errorMessage}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqFormItem',
        props: {
            name: String,
            label: String,
            labelWidth: String
        },
        data () {
            return {
                errorMessage: ''
            }
        },
        created () {
            if (this.name) { //只有name属性被赋值，该表单项才参与前端数据校验
                this.$parent.$set(this.$parent.items, this.name, this)
            }
        },
        mounted () {

        }
    }
</script>

<style >
    .c-form-item {
        overflow: hidden;
    }
    .c-form-item-label {
        float: left; padding-top: 8px; text-align: right; font-size: 14px; color: #48576a;
    }
    .c-form-item-content {
        margin-left: 90px;
    }
    .c-form-item-error {
        height: 22px; color: #ff4949; font-size: 12px;
    }
</style>