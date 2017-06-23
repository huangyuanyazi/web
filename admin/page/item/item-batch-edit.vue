<template>
    <div class="c-item-batch-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">导入商品</span>
            </div>
            <!--
            <div class="c-left" style="margin-left: 50px">
                <el-steps :space="200" :active="1" align-center="true" >
                    <el-step title="选择店铺和分类" description="1111"></el-step>
                    <el-step title="上传Excel文件"></el-step>
                    <el-step title="编辑并提交数据"></el-step>
                </el-steps>
            </div>
            -->
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">

            <!--上传Excel文件-->
            <div class="c-form" v-show="1 === step">
                <div class="c-form-content">
                    <el-form ref="uploadForm" label-width="80px">
                        <el-form-item>
                            <el-upload action="/excel" :show-file-list="false" :http-request="httpRequest" drag>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">点击上传Excel文件</div>
                                <div class="el-upload__tip" slot="tip" style="margin-top: 0">只能上传xlsx文件，且不超过20MB</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <div style="width: 360px; text-align: center"><el-button @click="back">返回上一步</el-button></div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <!--上传和解析进度-->
            <div class="c-form" v-show="2 === step">
                <div class="c-form-content" style="padding: 50px 0;">
                    <div style="text-align: center; font-size: 14px">{{progressName}}</div>
                    <el-progress :percentage="progressPercent"></el-progress>
                </div>
            </div>

            <!--保存预览-->
            <div v-show="3 === step">
                <div style="position: fixed; top: 60px; z-index: 200; left: 50%; background-color: #FFF; padding: 10px; border-radius: 5px;">
                    <el-button type="primary" @click="save">保存提交</el-button>
                    <el-button @click="reupload">重新上传</el-button>
                </div>
                <el-table :data="tableData" class="c-grid">
                    <!--
                    <el-table-column fixed type="selection" width="55"></el-table-column>
                    -->
                    <el-table-column v-for="(label, filedName) in tableLabels" :label="label" :key="filedName">
                        <template scope="scope">
                            <template v-if="scope.row.errors && scope.row.errors[filedName]">
                                <el-tooltip class="item" effect="dark" :content="scope.row.errors[filedName].join()" placement="top">
                                    <div v-html="scope.row[filedName]" class="c-cell-inner c-cell-error"></div>
                                </el-tooltip>
                            </template>
                            <template v-else>
                                <div v-html="scope.row[filedName]" class="c-cell-inner"></div>
                            </template>
                        </template>
                    </el-table-column>
                    <!--
                    <el-table-column fixed="right" label="操作" width="110">
                        <template scope="scope">
                            <div class="c-cell-inner">
                                <el-button type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">修改</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    -->
                </el-table>
                <!--
                <table>
                    <tr>
                        <th v-for="(label, filedName) in tableLabels">{{label}}</th>
                    </tr>
                    <tr v-for="item in tableItems">
                        <td v-for="(value, filedName) in item">
                            <div v-html="value" class="c-cell"></div>
                        </td>
                    </tr>
                </table>
                -->
            </div>
            
            <!--保存反馈-->
            <div v-if="4 === step">
                <div v-if="batchInserted.length > 0 || batchUpdated.length > 0">
                    <div style="position: fixed; top: 60px; z-index: 200; left: 50%; background-color: #FFF; padding: 10px; border-radius: 5px;">
                        <el-button @click="reupload">继续上传</el-button>
                    </div>
                    <el-alert title="商品保存成功" type="success" :description="responseText" show-icon></el-alert>
                    <dl>
                        <dt style="padding-bottom: 5px; font-size: 12px;">新增商品：</dt>
                        <dd style="padding-bottom: 20px;">
                            <div v-if="batchInserted.length > 0">
                                <el-tag v-for="id in batchInserted" :key="id">{{id}}</el-tag>
                            </div>
                            <div v-else>
                                <el-tag>无</el-tag>
                            </div>
                        </dd>
                        <dt style="padding-bottom: 5px; font-size: 12px;">修改商品：</dt>
                        <dd style="padding-bottom: 20px;">
                            <div v-if="batchUpdated.length > 0">
                                <el-tag v-for="id in batchUpdated" :key="id">{{id}}</el-tag>
                            </div>
                            <div v-else>
                                <el-tag>无</el-tag>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div v-else>
                    <div style="position: fixed; top: 60px; z-index: 200; left: 50%; background-color: #FFF; padding: 10px; border-radius: 5px;">
                        <el-button @click="reupload">重新上传</el-button>
                    </div>
                    <div style="padding-bottom: 20px;">
                        <el-alert title="商品保存失败" type="error" :description="responseText" show-icon></el-alert>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let io = require('socket.io-client')
    let socket = null
    export default {
        name: 'TqItemBatchEdit',
        data () {
            return {
                store_id: 0,
                step: 1,
                rawData: null,
                tableLabels: {},
                tableData: [],
                progressPercent: 0,
                progressName: '准备上传',
                batchInserted: [],
                batchUpdated: [],
                responseText: ''
            }
        },
        mounted () {
            console.log(process.browser)
            this.store_id = this.$route.query.store_id
        },
        methods: {
            httpRequest (options) {
                this.step = 2
                socket = io(config.socket.url)
                socket.on('connect', () => {
                    console.log('socket connected')
                })
                socket.on('excel-upload-progress', data => {
                    if (data.percent) {
                        this.progressPercent = parseInt(data.percent)
                        this.progressName = this.progressPercent < 100 ? data.name : '上传成功'
                    }
                })
                socket.on('excel-parse-percentage', data => {
                    if (data.percent) {
                        this.progressPercent = parseInt(data.percent)
                        this.progressName = this.progressPercent < 100 ? data.name : '解析成功'
                    }
                })
                socket.on('disconnect', () => {
                    console.log('socket disconnect')
                })

                let data = new FormData()
                data.append(options.filename, options.file)
                data.append('store_id', this.store_id)
                this.$http.post(options.action, data, {
                    headers: {'access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwia2V5IjoiMTExMTExIn0.aRnB9J6_6GM37HE_wNqjUeEIo6iwXkcMkh1t89ysKps'}
                }).then(res => {
                    this.step = 3
                    //console.log(res)
                    this.rawData = res.data
                    this.tableLabels = res.data.labels
                    let items = res.data.items
                    for (let item of items) {
                        let tmpItem = {}
                        for (let fieldName in item) {
                            if ('images' === fieldName) {
                                tmpItem[fieldName] = '<img src="' + config.img.url + item[fieldName] + '" width="100%">'
                            } else {
                                tmpItem[fieldName] = item[fieldName]
                            }
                        }
                        this.tableData.push(tmpItem)
                    }
                }).catch(err => {
                    this.step = 3
                    this.tableLabels = err.response.data.labels
                    let items = err.response.data.items
                    for (let item of items) {
                        let tmpItem = {}
                        for (let fieldName in item) {
                            if ('images' === fieldName) {
                                tmpItem[fieldName] = '<img src="' + config.img.url + item[fieldName] + '" width="100%">'
                            } else {
                                tmpItem[fieldName] = item[fieldName]
                            }
                        }
                        this.tableData.push(tmpItem)
                    }
                })
            },
            reupload () {
                this.step = 1
                this.rawData = null
                this.tableData = []
                this.tableLabels = {}
                this.progressPercent = 0
                this.progressName = '准备上传'
                this.batchInserted = []
                this.batchUpdated = []
                this.responseText = ''
            },
            save () {
                this.$http.post('/items/batch', this.rawData).then(res => {
                    this.step = 4
                    this.batchInserted = res.data.inserted
                    this.batchUpdated = res.data.updated
                    this.responseText = '新增商品' + res.data.inserted.length + '件，修改商品' + res.data.updated.length + '件'
                }).catch(err => {
                    this.step = 4
                    this.responseText = err.response.data.message
                })
            },
            back () {
                this.$router.go(-1)
            },
            cancel () {
                this.$router.go(-2)
            }
        }
    }
</script>

<style scoped>
    .el-table__body .cell {
        padding: 0;
    }
    .el-table__body .cell .c-cell-inner {
        padding: 0 12px;
    }
    .el-table__body .cell .c-cell-error {
        border: 1px solid red;
    }
    .el-table .info-row {
        background: #c9e5f5;
    }
    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>