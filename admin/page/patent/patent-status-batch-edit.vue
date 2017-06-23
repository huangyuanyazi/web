<template>
    <div class="c-patent-status-batch-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">批量更新专利状态</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">

            <!--上传Excel文件-->
            <tq-form v-show="1 === step">
                <tq-form-item>
                    <el-upload action="/cs-patent-statuses/excel" name="excel" :show-file-list="false" :http-request="httpRequest" drag>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">点击上传Excel文件</div>
                        <div class="el-upload__tip" slot="tip" style="margin-top: 0">只能上传xlsx文件，且不超过20MB</div>
                    </el-upload>
                </tq-form-item>
                <tq-form-item>
                    <div style="width: 360px; text-align: center"><el-button @click="cancel">取消</el-button></div>
                </tq-form-item>
            </tq-form>

            <!--保存预览-->
            <div v-show="2 === step">
                <div style="position: fixed; top: 60px; z-index: 200; left: 50%; background-color: #FFF; padding: 10px; border-radius: 5px;">
                    <el-button type="primary" @click="save">保存提交</el-button>
                    <el-button @click="reupload">重新上传</el-button>
                </div>
                <el-table :data="tableData" class="c-grid">
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
                </el-table>
            </div>

            <!--保存反馈-->
            <div v-if="3 === step">
                <div v-if="batchUpdated.length > 0 || batchIgnored.length > 0">
                    <div style="position: fixed; top: 60px; z-index: 200; left: 50%; background-color: #FFF; padding: 10px; border-radius: 5px;">
                        <el-button @click="reupload">继续上传</el-button>
                    </div>
                    <el-alert title="状态保存成功" type="success" :description="responseText" show-icon></el-alert>
                    <dl>
                        <dt style="padding-bottom: 5px; font-size: 12px;">修改专利：</dt>
                        <dd style="padding-bottom: 20px;">
                            <div v-if="batchUpdated.length > 0">
                                <el-tag v-for="patent in batchUpdated" :key="patent.sn" style="margin-right: 5px">{{patent.sn}}</el-tag>
                            </div>
                            <div v-else>
                                <el-tag>无</el-tag>
                            </div>
                        </dd>
                        <dt style="padding-bottom: 5px; font-size: 12px;">忽略专利：</dt>
                        <dd style="padding-bottom: 20px;">
                            <div v-if="batchIgnored.length > 0">
                                <el-tag v-for="patent in batchIgnored" :key="patent.sn" style="margin-right: 5px">{{patent.sn}}</el-tag>
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
                        <el-alert title="状态保存失败" type="error" :description="responseText" show-icon></el-alert>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqPatentStatusBatchEdit',
        data () {
            return {
                step: 1,
                rawData: null,
                tableLabels: {},
                tableData: [],
                batchUpdated: [],
                batchIgnored: [],
                responseText: ''
            }
        },
        methods: {
            httpRequest (options) {
                let data = new FormData()
                //console.log(options.filename)
                data.append(options.filename, options.file)
                this.$http.post(options.action, data).then(res => {
                    console.log(res.data)
                    //this.patent = res.data.item
                    this.step = 2
                    this.rawData = res.data
                    this.tableLabels = res.data.labels
                    let items = res.data.items
                    for (let item of items) {
                        let tmpItem = {}
                        for (let fieldName in item) {
                            tmpItem[fieldName] = item[fieldName]
                        }
                        this.tableData.push(tmpItem)
                    }
                }).catch(err => {
                    console.log(err.response.data)
                    this.step = 2
                    this.tableLabels = err.response.data.labels
                    let items = err.response.data.items
                    for (let item of items) {
                        let tmpItem = {}
                        for (let fieldName in item) {
                            tmpItem[fieldName] = item[fieldName]
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
                this.batchUpdated = []
                this.batchIgnored = []
                this.responseText = ''
            },
            save () {
                this.$http.post('/cs-patent-statuses/batch', this.rawData).then(res => {
                    this.step = 3
                    this.batchUpdated = res.data.updated
                    this.batchIgnored = res.data.ignored
                    this.responseText = '修改专利' + res.data.updated.length + '件，忽略专利' + res.data.ignored.length + '件'
                }).catch(err => {
                    this.step = 3
                    this.responseText = err.response.data.message
                })
            },
            back () {
                this.$router.go(-1)
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>