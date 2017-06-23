<template>
    <div class="c-article-index">
        <!--
        <el-tabs v-model="activeName" v-if="true">
            <el-tab-pane label="TAB-1" name="first"></el-tab-pane>
            <el-tab-pane label="TAB-2" name="second"></el-tab-pane>
            <el-tab-pane label="TAB-3" name="third"></el-tab-pane>
            <el-tab-pane label="TAB-4" name="fourth"></el-tab-pane>
        </el-tabs>
        -->
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增文章</el-button>
                <el-button type="primary" size="small" class="c-button" @click="toCategory"><i class="fa fa-bars"></i>分类管理</el-button>
            </div>
            <div class="c-right">
                <el-form :inline="true" :model="searcher">
                    <el-form-item>
                        <el-input v-model="searcher.title" size="small" placeholder="标题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="searcher.article_category_id" clearable size="small" placeholder="分类">
                            <el-option v-for="category in categories" :label="category.name" :value="category.id" :key="category.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="doSearch" size="small"><i class="fa fa-search"></i>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="articles" class="c-grid">
                <el-table-column fixed type="selection" width="46"></el-table-column>
                <el-table-column prop="id" label="#" width="80"></el-table-column>
                <el-table-column label="分类" width="180">
                    <template scope="scope">
                        {{categoryNames[scope.row.article_category_id]}}
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column label="创建时间" width="180">
                    <template scope="scope">
                        {{scope.row.created_at | date-format}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template scope="scope">
                        <a :href="siteUrl + '/article/' + scope.row.id" class="el-button--text" style="text-decoration: none; font-size: 12px; margin-right: 5px" target="_blank">查看</a>
                        <!--<el-button type="text" @click="view" size="small">查看</el-button>-->
                        <el-button type="text" @click="modify(scope.row.id)" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
                <div class="c-left">
                    <span class="c-label">批量操作</span>
                    <el-button size="small"><i class="fa fa-remove"></i>删除</el-button>
                </div>
                <div class="c-right">
                    <el-pagination @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="totalCount" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'TqArticleIndex',
        data () {
            return {
                articles: [],
                searcher: {
                    title: null,
                    article_category_id: null
                },
                categories: [],
                categoryNames: {},
                currentPage: 1,
                pageSize: 20,
                totalCount: 0,
                //activeName: {},
                siteUrl: config.site.url
            }
        },
        activated () {
            this.search()
        },
        mounted () {
            this.$http.get('/article-categories').then(categoriesRes => {
                this.categories = categoriesRes.data
                for (let category of categoriesRes.data) {
                    this.categoryNames[category.id] = category.name
                }
            })
        },
        methods: {
            search (page) {
                let loading = this.$loading({ target: '.c-main' })
                if (page)
                    this.currentPage = parseInt(page)
                let params = {
                    'page': this.currentPage,
                    'per-page': this.pageSize,
                    'sort': '-id'
                }
                if (this.searcher.title)
                    params.title = '~' + this.searcher.title
                if (this.searcher.article_category_id)
                    params.article_category_id = this.searcher.article_category_id
                this.$http.get("/articles", { params }).then(articlesRes => {
                    this.totalCount = parseInt(articlesRes.headers['x-pagination-total-count'])
                    this.articles = articlesRes.data
                    loading.close()
                })
            },
            doSearch () {
                if (1 === this.currentPage) {
                    this.search()
                } else {
                    this.currentPage = 1
                }
            },
            create () {
                this.$router.push("/content/article-edit")
            },
            view () {

            },
            modify (id) {
                this.$router.push("/content/article-edit/" + id)
            },
            changePage (page) {
                this.search(page)
            },
            toCategory () {
                this.$router.push("/content/article-category-index")
            }
        }
    }
</script>