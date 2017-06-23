<template>
    <div class="c-article-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">{{0 == id ? "新增" : "修改"}}文章</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <tq-form ref="articleForm" model="Article" :data="article">
                <tq-form-item name="article_category_id" label="文章分类">
                    <el-select v-model="article.article_category_id" placeholder="请选择分类">
                        <el-option v-for="category in categories" :label="category.name" :value="category.id" :key="category.id"></el-option>
                    </el-select>
                </tq-form-item>
                <tq-form-item name="title" label="标题">
                    <el-input v-model="article.title"></el-input>
                </tq-form-item>
                <tq-form-item name="content" label="正文" class="c-editor-wrap">
                    <tq-editor v-model="article.content" image-upload-url="#"></tq-editor>
                </tq-form-item>
                <tq-form-item name="keywords" label="关键词">
                    <el-input v-model="keywords"></el-input>
                </tq-form-item>
                <tq-form-item>
                    <el-button type="primary" @click="save">保存提交</el-button>
                    <el-button @click="cancel">取消</el-button>
                </tq-form-item>
            </tq-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqArticleEdit',
        data () {
            return {
                id: 0,
                article: {
                    article_category_id: null,
                    content: '<p>123</p><p>456</p>'
                },
                categories: [],
                keywords: ''
            }
        },
        watch: {
            keywords (val) {
                this.$set(this.article, 'keywords', JSON.stringify(_.trim(val).split(' ')))
            }
        },
        created () {
            this.$http.get('/article-categories').then(categoriesRes => {
                this.categories = categoriesRes.data
            })
        },
        mounted () {
            if (this.$route.params.id > 0) {
                let loading = this.$loading({ target: '.c-main' })
                this.id = this.$route.params.id
                this.$http.get("/articles/" + this.id).then(articlesRes => {
                    this.article = articlesRes.data
                    this.keywords = JSON.parse(articlesRes.data.keywords).toString().replace(/,/g, ' ')
                    loading.close()
                })
            }
        },
        methods: {
            save () {

                this.$refs.articleForm.validate(valid => {
                    console.log(valid)
                    if (valid) {
                        if(this.id > 0) {
                            this.$http.put('/articles/' + this.id, this.article).then(articlesRes => {
                                this.$router.go(-1)
                            }).catch(articlesErr => {
                                alert(JSON.stringify(articlesErr.response.data))
                            })
                        } else {
                            this.$http.post("/articles", this.article).then(articlesRes => {
                                this.$router.go(-1)
                            }).catch(articlesErr => {
                                alert(JSON.stringify(articlesErr.response.data))
                            })
                        }
                    }
                })

                /*



                */

                /*
                let validation = new Validation('Article', this.article)

                validation.validateField('article_category_id', '文章分类').then(categoryIdMessages => { //本地校验无误后，再执行远程判断时产生404错误http://site.tqtest.com/[object%20Object]
                    console.log(categoryIdMessages.join())
                })

                validation.validateField('title', '标题').then(titleMessages => {
                    console.log(titleMessages.join())
                })

                validation.validateField('content', '内容').then(contentMessages => {
                    console.log(contentMessages.join())
                })

                validation.validateField('keywords', '关键词').then(keywordsMessages => { //JSON格式，如["aaa", "bbb"] 无法通过验证，原因未知
                    console.log(keywordsMessages.join())
                })
                 */
                //当以上验证全部通过时，需要执行业务逻辑代码，除了使用co等方案（将上面的各个validateField转换成同步执行）外，找不到业执行务逻辑代码的契机

                /*
                this.$refs.form.validate((valid) => {
                    if (valid) {

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
                */
            },
            cancel () {
//                this.$set(this.article, 'content', 'abc')
                //this.content = 'abc'
//                console.log(this.article)
                this.$router.go(-1)
            }
            /*
            validate () {
                let vData = {
                    article_category_id: "2",
                    title: "",
                    content: "<p>内容对对对</p>",
                    keywords: "好的"
                }
                let vLabels = {
                    article_category_id: "文章分类",
                    title: "标题",
                    content: "正文",
                    keywords: "关键词"
                }
            },
            editorHtml () {
                console.log(this.article.content)
            }
             */
        }
    }
</script>

<style>



</style>