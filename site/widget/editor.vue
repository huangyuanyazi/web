<template>
    <div class="c-editor">
        {{value}}
        <div id="editor"></div>

        <el-dialog title="插入链接" v-model="linkEditVisible" size="tiny" top="25%">
            <div>
                <el-input placeholder="请输入内容" v-model="link"></el-input>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <el-button type="primary" @click="insertLink">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="上传图片" v-model="imageUploadVisible" size="tiny" top="25%">
            <el-upload :action="imageUploadUrl" :on-success="imageUploadSuccess" :on-error="imageUploadError" style="text-align: center;">
                <el-button type="primary">点击上传</el-button>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
    import Quill from "quill"
    export default {
        name: "TqEditor",
        props: {
            value: [String, Number], //文本初始值，由v-model传入
            imageUploadUrl: String //图片上传服务url
        },
        data () {
            return {
                quill: null,
                content: '',
                link: "",
                linkEditVisible: false,
                imageUploadVisible: false
            }
        },
        watch: {
            value (val) {
                console.log(val)
                this.quill.clipboard.dangerouslyPasteHTML(val)
                //this.content = val
                //this.quill.setText(val)
            }
        },
        mounted () {

            //console.log(this.value)
            //this.content = this.value
            let vm = this
            let Font = Quill.import("attributors/style/font")
            Font.whitelist = ["宋体", "微软雅黑", "仿宋", "楷体", "Georgia", "Helvetica"]
            Quill.register(Font, true)

            let Size = Quill.import("attributors/style/size")
            Size.whitelist = ["10px", "12px", "14px", "16px", "24px", "32px"]
            Quill.register(Size, true)

            let Direction = Quill.import("attributors/style/direction")
            Quill.register(Direction, true)

            let Align = Quill.import("attributors/style/align")
            Quill.register(Align, true)

            this.quill = new Quill("#editor", {
                theme: "snow",
                modules: {
                    toolbar: {
                        container: [
                            [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                {"color": []},
                                {"background": []},
                                {"font": ["宋体", false, "仿宋", "楷体", "Georgia", "Helvetica"]},
                                {"size": ["10px", false, "14px", "16px", "24px", "32px"]},
                                {"script": "sub"},
                                {"script": "super"},
                                "link",
                                "image",
                                "video",
                                "formula"
                            ], [
                                "blockquote",
                                "code-block",
                                {"list": "ordered"},
                                {"list": "bullet"},
                                {"indent": "-1"},
                                {"indent": "+1"},
                                {"direction": "rtl"},
                                {"align": []},
                                {"header": [1, 2, 3, 4, 5, 6, false]},
                                "clean"
                            ]
                        ],
                        handlers: {
                            "link": function (value) {
                                if (value)
                                    vm.linkEditVisible = true
                                else
                                    this.quill.format("link", false)
                            },
                            "image": function (value) {
                                vm.imageUploadVisible = true
                            }
                        }
                    }
                }
            })
            //let delta = this.quill.getContents()
            //console.log(delta)

            //编辑器文本变化时触发父组件input事件
            //this.quill.on("text-change", () => vm.$emit("input", this.quill.container.firstChild.innerHTML))
        },
        methods: {
            insertLink () {
                this.quill.format("link", this.link)
                this.link = ""
                this.linkEditVisible = false
            },
            imageUploadSuccess (response, file, fileList) {
                //图片上传成功后，将图片地址插入编辑器光标所在位置
                let range = this.quill.getSelection(true)
                this.quill.insertEmbed(range.index, "image", URL.createObjectURL(file.raw))
                this.imageUploadVisible = false
            },
            imageUploadError (err, response, file) {
                let range = this.quill.getSelection(true)
                this.imageUploadVisible = false
                console.log(err)
            }
        }
    }
</script>

<style>
    .ql-snow .ql-picker.ql-font .ql-picker-label::before, .ql-snow .ql-picker.ql-font .ql-picker-item::before { content: "微软雅黑"; }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="宋体"]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="宋体"]::before { content: "宋体"; }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="宋体"]::before { font-family:"SimSun", "宋体"; }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="微软雅黑"]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="微软雅黑"]::before { content: "微软雅黑"; }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="微软雅黑"]::before { font-family: "Microsoft YaHei", "微软雅黑"; }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="仿宋"]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="仿宋"]::before { content: "仿宋"; }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="仿宋"]::before { font-family: "FangSong", "仿宋"; }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="楷体"]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="楷体"]::before { content: "楷体"; }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="楷体"]::before { font-family: "KaiTi", "楷体"; }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Georgia"]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Georgia"]::before { content: "Georgia"; }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Georgia"]::before { font-family: "Gabriola"; }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Helvetica"]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Helvetica"]::before { content: "Helvetica"; }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Helvetica"]::before { font-family: "Helvetica"; }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before { content: "12px"; }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before { content: "10px"; }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before { font-size: 10px; }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before { content: "12px"; }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before { font-size: 12px; }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before { content: "14px"; }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before { font-size: 14px; }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before { content: "16px"; }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before { font-size: 16px; }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before { content: "24px"; }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before { font-size: 24px; }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before { content: "32px"; }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before { font-size: 32px; }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before, .ql-snow .ql-picker.ql-header .ql-picker-item::before { content: "段落"; }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before { content: "标题1"; }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before { content: "标题2"; }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before { content: "标题3"; }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before { content: "标题4"; }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before { content: "标题5"; }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before { content: "标题6"; }
</style>