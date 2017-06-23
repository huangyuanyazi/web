<template>
    <div class="c-emoticon-wrapper" v-on:click.stop>
        <div class="c-emoticon-icon" v-on:click.stop="boxIsShow" ></div>
        <div class="c-emoticon-box" v-show="boxShow"  v-on:mouseleave="boxHide" v-on:mouseenter="clearTime">
            <div class="c-emoticon-arrow">
                <span class="c-empticon-icon"></span>
                <span class="c-empticon-close" v-on:click="closeBox">x</span>
            </div>
            <div class="c-empticon-wrap">
                <ul class="c-empticon-nav">
                    <li class="c-empticon-group" v-on:click="tabSwitch(index)" v-bind:class="{active:item.isshow}" v-for="(item, index) in emoticon" v-text="item.name"></li>
                </ul>
                <ul class="c-empticon-list" v-for="(item, index) in emoticon" v-show="emoticon[index].isshow">
                    <li class="c-empticon-item" v-on:click="getPhrase(index,childIndex,$event)" v-for="(childItem, childIndex) in item.contents" v-bind:title="childItem.phrase">
                        <img v-bind:src="childItem.url" v-bind:alt="childItem.phrase" class="c-empticon-img">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"tq-empticon",
        data: function () {
            return {  
                //emj 盒子 is show
                boxShow:false, 
                timer:"",  
                "emoticon":[
                    {
                    "name":"微博",
                    "isshow":true,
                    "contents":[
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/41/zz2_org.gif",
                            "phrase": "[织]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_org.gif",
                            "phrase": "[神马]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_org.gif",
                            "phrase": "[浮云]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_org.gif",
                            "phrase": "[给力]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_org.gif",
                            "phrase": "[围观]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_org.gif",
                            "phrase": "[威武]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_org.gif",
                            "phrase": "[熊猫]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/81/rabbit_org.gif",
                            "phrase": "[兔子]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/otm_org.gif",
                            "phrase": "[奥特曼]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/15/j_org.gif",
                            "phrase": "[囧]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/hufen_org.gif",
                            "phrase": "[互粉]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c4/liwu_org.gif",
                            "phrase": "[礼物]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ac/smilea_org.gif",
                            "phrase": "[呵呵]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0b/tootha_org.gif",
                            "phrase": "[嘻嘻]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6a/laugh.gif",
                            "phrase": "[哈哈]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/14/tza_org.gif",
                            "phrase": "[可爱]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/kl_org.gif",
                            "phrase": "[可怜]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a0/kbsa_org.gif",
                            "phrase": "[挖鼻屎]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f4/cj_org.gif",
                            "phrase": "[吃惊]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/shamea_org.gif",
                            "phrase": "[害羞]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c3/zy_org.gif",
                            "phrase": "[挤眼]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/29/bz_org.gif",
                            "phrase": "[闭嘴]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/71/bs2_org.gif",
                            "phrase": "[鄙视]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/lovea_org.gif",
                            "phrase": "[爱你]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9d/sada_org.gif",
                            "phrase": "[泪]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/19/heia_org.gif",
                            "phrase": "[偷笑]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8f/qq_org.gif",
                            "phrase": "[亲亲]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b6/sb_org.gif",
                            "phrase": "[生病]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/mb_org.gif",
                            "phrase": "[太开心]"
                        }
                    ]
                },
                {
                    "name":"qq",
                    "isshow":false,
                    "contents":[
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "小新小浪",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/eb/gd_org.gif",
                            "phrase": "[痛哭]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "小新小浪",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/38/fn2_org.gif",
                            "phrase": "[爆发]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "小新小浪",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/31/d2_org.gif",
                            "phrase": "[发奋]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "小新小浪",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b0/bx_org.gif",
                            "phrase": "[不屑]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "蘑菇点点",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/3b/zy2_org.gif",
                            "phrase": "[眨眨眼]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "蘑菇点点",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ec/zs_org.gif",
                            "phrase": "[杂技]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "蘑菇点点",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/17/wh2_org.gif",
                            "phrase": "[多问号]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "蘑菇点点",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/79/ts_org.gif",
                            "phrase": "[跳绳]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "蘑菇点点",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b1/q3_org.gif",
                            "phrase": "[强吻]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "蘑菇点点",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/37/lb2_org.gif",
                            "phrase": "[不活了]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "蘑菇点点",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6a/kt_org.gif",
                            "phrase": "[磕头]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "蘑菇点点",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/55/bya_org.gif",
                            "phrase": "[呜呜]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "蘑菇点点",
                            "is_common": false,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a2/bx2_org.gif",
                            "phrase": "[不]"
                        }
                    ]
                },
                {
                    "name":"微信",
                    "isshow":false,
                    "contents":[
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/17/ldln_org.gif",
                            "phrase": "[懒得理你]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/98/yhh_org.gif",
                            "phrase": "[右哼哼]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/zhh_org.gif",
                            "phrase": "[左哼哼]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a6/x_org.gif",
                            "phrase": "[嘘]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/cry.gif",
                            "phrase": "[衰]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/73/wq_org.gif",
                            "phrase": "[委屈]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9e/t_org.gif",
                            "phrase": "[吐]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f3/k_org.gif",
                            "phrase": "[打哈气]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/27/bba_org.gif",
                            "phrase": "[抱抱]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7c/angrya_org.gif",
                            "phrase": "[怒]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/5c/yw_org.gif",
                            "phrase": "[疑问]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a5/cza_org.gif",
                            "phrase": "[馋嘴]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/88_org.gif",
                            "phrase": "[拜拜]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/e9/sk_org.gif",
                            "phrase": "[思考]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/24/sweata_org.gif",
                            "phrase": "[汗]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7f/sleepya_org.gif",
                            "phrase": "[困]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6b/sleepa_org.gif",
                            "phrase": "[睡觉]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/90/money_org.gif",
                            "phrase": "[钱]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0c/sw_org.gif",
                            "phrase": "[失望]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/cool_org.gif",
                            "phrase": "[酷]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8c/hsa_org.gif",
                            "phrase": "[花心]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/49/hatea_org.gif",
                            "phrase": "[哼]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/36/gza_org.gif",
                            "phrase": "[鼓掌]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d9/dizzya_org.gif",
                            "phrase": "[晕]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1a/bs_org.gif",
                            "phrase": "[悲伤]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/62/crazya_org.gif",
                            "phrase": "[抓狂]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/91/h_org.gif",
                            "phrase": "[黑线]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/yx_org.gif",
                            "phrase": "[阴险]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/nm_org.gif",
                            "phrase": "[怒骂]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/hearta_org.gif",
                            "phrase": "[心]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ea/unheart.gif",
                            "phrase": "[伤心]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/pig.gif",
                            "phrase": "[猪头]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d6/ok_org.gif",
                            "phrase": "[ok]"
                        },
                        {
                            "order_number": 0,
                            "is_hot": false,
                            "category": "",
                            "is_common": true,
                            "type": "face",
                            "url": "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d9/ye_org.gif",
                            "phrase": "[耶]"
                        }
                    ]   
                }]
            }
        },
        created:function() {
            
        },
        mounted: function () {
            this.$nextTick(function () {
                var _this=this;
                document.body.addEventListener("click",function(event){
                    
                    if(_this.boxShow){
                        _this.boxShow=false;
                    }
                    
                })
            });
            
        },
        watch: {
            
        }, 
        computed: {
            //计算属性
        },
        methods: { 
            //表情包box是否显示
            boxIsShow:function(){
                
                this.boxShow= !this.boxShow;
            },
            boxHide:function () {
                this.timer=setTimeout(()=>{
                    this.boxShow= false;
                }, 200);
            },
            clearTime:function () {
                clearTimeout(this.timer);
            },
            // 表情包label切换     
            tabSwitch:function (index) {
               
                for (var i = 0; i < this.emoticon.length; i++) {
                    this.emoticon[i].isshow=false;
                }
                this.emoticon[index].isshow=true;
            },
            // 关闭表情包box
            closeBox:function () {

                this.boxShow=false;  
            },
            //点击表情获取img标签和url路径
            getPhrase:function (index,childIndex,event) {
                var emjData={};
                    emjData.phrase=this.emoticon[index].contents[childIndex].phrase;
                    emjData.url=this.emoticon[index].contents[childIndex].url;
                    emjData.obj=event;
                this.$emit("on-emj-change",emjData);  
            },
        }    
    }
</script>
<style lang="less">
    //表情包样式
    .c-emoticon-wrapper{
        float: left;
        border: 1px solid #ddd;
        margin-left: 3%;
        position: relative;
        width: 58px;
        height: 34px;
        .c-emoticon-icon{
            width: 100%;
            height: 100%;
            cursor: pointer;
            background: url(../asset/image/smilea_org.gif) no-repeat 10px center;
            line-height: 32px;
        }
        .c-emoticon-icon:after{
            content: "";
            display: block;
            position: absolute;
            top: 15px;
            right: 8px;
            border: 6px solid #666;
            border-color: #666 transparent transparent transparent ;
        }
        .c-emoticon-box{
            padding: 20px 20px 10px;
            border: 1px solid #ddd;
            width: 372px;
            border-radius: 5px;
            background: #fff;
            position: absolute; 
            left: 0;
            top: 45px;
            z-index: 10;
            box-shadow:0 0 5px rgba(0,0,0,0.3);
            .c-emoticon-arrow{
                .c-empticon-icon{
                    position: absolute;
                    top: -18px;
                    left: 20px;
                }
                .c-empticon-icon:before{
                    content: "";
                    display: block;
                    position: absolute;
                    border: 10px solid #ddd;
                    top: -2px;
                    border-color: transparent transparent #ddd transparent ;
                }
                .c-empticon-icon:after{
                    content: "";
                    display: block;
                    position: absolute;
                    border: 10px solid #fff;
                    border-color: transparent transparent #fff transparent ;
                }
                .c-empticon-close{
                    display: block;
                    position: absolute;
                    cursor: pointer;
                    color: #999;
                    font-size: 14px;
                    height: 16px;
                    text-align: center;
                    line-height: 16px;
                    width: 16px;
                    right: 5px;
                    top: 5px;
                }
                .c-empticon-close:hover{
                    background: #E54C53;
                    color: #fff;
                }
            }
            .c-empticon-wrap{
                width: 100%;
                height: 100%;
                .c-empticon-nav{
                    display: block;
                    width: 100%;
                    height: 30px;
                    margin-bottom: 10px;
                    li{
                        float: left;
                        height: 100%;
                        padding: 0 15px;
                        margin-right: 5px;
                        color: #666;
                        line-height: 30px;
                        cursor: pointer;
                    }
                    .active{
                        color: #E54C53;
                        line-height: 28px;
                        border-bottom: 2px solid #E54C53;
                    }
                }
                .c-empticon-list{
                    display: block;
                    width: 100%;
                    // height: 100%-40px;
                    overflow: hidden;
                    .c-empticon-item{
                        float: left;
                        display: block;
                        width: 28px;
                        height: 28px;
                        margin: 0 5px 5px 0;
                        text-align: center;
                        line-height: 1;
                        border: 1px solid #E8E8E8;
                        cursor: pointer;
                        img{
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }
                    .c-empticon-item:hover{
                        border: 1px solid #E54C53;
                    }
                }
            }
        } 
    }
    
    
</style>