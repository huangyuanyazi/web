<template>
    <div class="c-item-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small"><i class="fa fa-plus"></i>新增商品</el-button>
            </div>
        </div>
        <div class="c-main">
            <el-tabs v-model="activeName" @tab-click="handleClick" v-if="true">
                <el-tab-pane label="待上架" name="first"></el-tab-pane>
                <el-tab-pane label="销售中" name="second"></el-tab-pane>
                <el-tab-pane label="已下架" name="third"></el-tab-pane>
                <el-tab-pane label="回收站" name="fourth"></el-tab-pane>
            </el-tabs>
            <div class="c-grid-header">
                <el-form :inline="true" :model="formInline">
                    <el-form-item>
                        <el-input v-model="formInline.user" size="small" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formInline.region" size="small" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="small"><i class="fa fa-search"></i>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" border class="c-grid">
                <el-table-column fixed type="selection" width="46"></el-table-column>
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="操作" width="110">
                    <template scope="scope">
                        <el-button @click="handleClick" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
                <div class="c-left">
                    <span class="c-label">批量操作</span>
                    <el-button size="small"><i class="fa fa-remove"></i>删除</el-button>
                </div>
                <div class="c-right">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, prev, pager, next, jumper"
                            :total="400">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎cccc',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods: {
            search() {
                console.log('submit!');
            },
            handleClick() {

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>