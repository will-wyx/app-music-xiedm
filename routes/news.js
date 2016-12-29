/**
 * Created by WILL on 2016/12/20.
 */
const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/', (req, res) => {
    const pagesize = 15;
    db.newsPaging({index: 1, pagesize}, (news, count) => {
        res.render('news-list', {path: 'news', pagesize, count});
    });
});

router.get('/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.newsOne({_id}, (news) => {
        if (news && news.date) {
            news.date = new Date(news.date).Format('yyyy-MM-dd hh:mm:ss');
        }
        res.render('news', {path: 'news', news});
    });
});

Date.prototype.Format = function (fmt) { //author: meizz
    const o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

module.exports = router;