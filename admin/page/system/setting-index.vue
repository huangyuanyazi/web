<template>
    <div class="c-system-setting-index">
        <div class="c-header">
            <div class="c-left">
                <!--<el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增配置项</el-button>-->
            </div>
        </div>
        <div class="c-main">
            <el-table :data="settings" class="c-grid">
                <!--
                <el-table-column fixed type="selection" width="46"></el-table-column>
                -->
                <el-table-column prop="id" label="#" width="80"></el-table-column>
                <el-table-column prop="description" label="说明" width="200"></el-table-column>
                <el-table-column prop="key" label="键" width="260"></el-table-column>
                <el-table-column prop="value" label="值"></el-table-column>
                <el-table-column fixed="right" label="操作" width="70">
                    <template scope="scope">
                        <el-button type="text" @click="modify(scope.row.id)" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
                <div class="c-left">
                    <!--
                    <span class="c-label">批量操作</span>
                    <el-button size="small"><i class="fa fa-remove"></i>删除</el-button>
                    -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqSettingIndex',
        data () {
            return {
                settings: []
            }
        },
        activated () {
            this.$http.get('/settings', {
                params: {
                    'offset': 0,
                    'limit': 1000
                }
            }).then(settingsRes => {
                this.settings = settingsRes.data
            })
        },
        mounted () {

        },
        methods: {
            create () {
                this.$router.push("/system/setting-edit")
            },
            modify (id) {
                this.$router.push("/system/setting-edit/" + id)
            }
        }
    }
</script>