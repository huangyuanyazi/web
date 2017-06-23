<template>
    <div class="c-adv-position-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增位置</el-button>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="toAdv"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="positions" class="c-grid">
                <el-table-column fixed type="selection" width="46"></el-table-column>
                <el-table-column prop="id" label="ID" width="180"></el-table-column>
                <el-table-column prop="code" label="助记代码" width="180"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column label="类型" width="180">
                    <template scope="scope">
                        {{scope.row.type}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template scope="scope">
                        <el-button type="text" @click="modify(scope.row.id)" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
                <div class="c-left">
                    <span class="c-label">批量操作</span>
                    <el-button size="small"><i class="fa fa-remove"></i>删除</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqAdvPositionIndex',
        data () {
            return {
                positions: []
            }
        },
        methods: {
            create () {
                this.$router.push("/content/adv-position-edit")
            },
            modify (id) {

            },
            toAdv () {
                this.$router.push("/content/adv-index")
            }
        }
    }
</script>