/**
 * Created by WILL on 2016/12/20.
 */
const express = require('express');
const router = express.Router();
const dbserver = require('../dbserver');

router.get('/', (req, res) => {
    // res.send(global.db);
    // dbserver.news(['id', 'title', 'date'], (news) => {
    //     res.render('news-list', {path: 'news', news});
    // });
    dbserver.news((news) => {
        res.render('news-list', {path: 'news', news});
    });
});

router.get('/:id', (req, res) => {
    const article =
        `
<div class="article annArticle">
<style>

	.button {
		padding: 20px 0 10px 0;
	}

</style>
<img src="http://img.kanjian.com/group3/M00/17/58/wKhkGVd_UbyAW8SuAAgyvh707L82948280" alt="banner">
<br>
<p>7月6日，［星球发行］新添重量级合作伙伴，与享誉欧陆的英国独立唱片公司Billberg（全称Billberg Entertainment）签订长期版权代理合作，帮助Billberg在亚洲全权管理和发行版权。</p>
<img src="http://img.kanjian.com/group3/M00/17/57/wKhkGVd_HlWAFRv4AADTXE3KtzA0487658" width="600" alt="Label Logo">
<br>
<p>Billberg总部位于伦敦，公司为全球的独立音乐人提供录音、制作、发行以及推广在内的全套服务。Billberg与全球最大的唱片公司Universal Music（环球唱片）、世界上最大的广播公司BBC、韩国四大无线电视公司之一的SBS等，都有着深度合作，与此同时，Billberg在全球还拥有超过50 000+个合作站点。强大的资源脉络也使得全世界范围里越来越多的独立音乐人投入到Billberg旗下。此外，电音厂牌Yellow Rhinestone records、乡村乐厂牌Boots On Dust Records、爵士/蓝调/灵魂乐厂牌Soulful Vibes Records&nbsp;以及金属乐厂牌Cage Break Records&nbsp;等都属于Billberg唱片公司，拥有数量庞大且优质的音乐版权。</p>
<br>
<img src="http://img.kanjian.com/group3/M00/18/DE/wKhkCVd_eOeALJkTACOp4sEXxws1513239&#10;" width="600" height="400" alt="Billberg artist">
<p style="text-align:center;color:#8E8E8E;">Anton Ewald</p>
<br>
<p>&nbsp;Billberg唱片公司也拥有诸多优质的艺人资源，比如蜚声海外的电音组合Catflight与欧陆当红小生Anton Ewald。值得一提的是，上述两位艺人都荣登过iTunes和Spotify榜单的第一名，Anton Ewald单凭一首《Begging》就在Spotify上斩获超过千万次播放。此次Billberg与「星球发行」的合作，将会为整个亚太区乐迷带来更多惊喜！</p>
<br>
<br>
<p style="color:#8E8E8E;">「星球发行」是看见音乐旗下的音乐管理发行平台，通过技术构建全球发行网络、版权管理、数据统计和结算系统，版权人（音乐人）可以轻松一键发行到全球的流媒体、运营商、硬件、公播等各个渠道，发行覆盖全球95%的音乐市场，提升了发行效率和发行收益，并结合版权侦测技术和维权行动有效的打击侵权！</p>
<br>
<p style="color:#8E8E8E;">现在，加入并使用［星球发行］吧！<a href="http://star.kanjian.com/" style="color:#20C1E8;">立即加入&gt;&gt;</a></p>
<br>
<div style="border:1px double #EEE;padding:20px 20px 0 20px;backgroud-color:#F7F7F7">
<h4>星球发行相关</h4>
    <ul>
        <li>星球发行 STAR DISTRIBUTION<a href="http://www.kanjian.com/stardistribution" style="color:#20C1E8;"> 点击了解&gt;&gt;</a>
        </li>
        <li>星球发行 × DashGo - 带来欧美音乐的过去和未来<a href="http://www.kanjian.com/aboutus/ann/395/" style="color:#20C1E8;"> 点击了解&gt;&gt;</a>
        </li>
       <li>星球发行 × 时永 - 带来中国特色的世界音乐<a href="http://www.kanjian.com/aboutus/ann/429/" style="color:#20C1E8;"> 点击了解&gt;&gt;</a>
        </li>
        <li>星球发行 × Nuclear Blast – 带来世界顶级金属音乐<a href="http://www.kanjian.com/aboutus/ann/435/" style="color:#20C1E8;"> 点击了解&gt;&gt;</a>
        </li>
        <li>星球发行 - 帮助中国独立音乐人走向世界<a href="http://www.kanjian.com/aboutus/ann/442/" style="color:#20C1E8;"> 点击了解&gt;&gt;</a>
        </li>
        <li>星球发行与小米音乐正式签订合作<a href="http://www.kanjian.com/aboutus/ann/445/" style="color:#20C1E8;"> 点击了解&gt;&gt;</a>
        </li>
        <li>星球发行 x GoaProductions - 给世界带来新节奏<a href="http://www.kanjian.com/aboutus/ann/447/" style="color:#20C1E8;"> 点击了解&gt;&gt;</a></li>
    </ul>
</div>
<br>
<img src="http://img.kanjian.com/group3/M00/16/C5/wKhkCVbKpqeACntcAAI43i83M0s9524007" alt="stardistribution" float:center="" margin:10px;="">
<br>
	<class="button"><a href="http://star.kanjian.com/" onclick="ga('send','event','星球发行二期','立即申请');" target="_blank"><img align="center" src="http://img.kanjian.com/group3/M00/11/3A/wKhkGVWPkOCAVsATAAAY_lxxt502483421" width="256" alt="立即申请"></a>
</class="button"></div>    
`;
    res.render('news', {id: req.params.id, article});
});

module.exports = router;