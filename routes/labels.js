/**
 * Created by WYX on 2016/12/18.
 */
const express = require('express');
const router = express.Router();

const labels = [
    {
        title: '华纳音乐',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/labels/1.jpg',
        code: 'xaq'
    },
    {
        title: '滚石唱片',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/labels/2.png',
        code: 'oo'
    },
    {
        title: '索尼音乐',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/labels/3.jpg',
        code: 'wwz'
    },
    {
        title: '光线传媒',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/labels/4.jpg',
        code: 'xaq'
    },
    {
        title: '金牌大风',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/labels/5.jpg',
        code: 'xaq'
    },
    {
        title: '种子音乐',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/labels/6.jpg',
        code: 'xaq'
    },
    {
        title: '海蝶音乐',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/labels/7.jpg',
        code: 'xaq'
    },
    {
        title: '华谊音乐',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/labels/8.jpg',
        code: 'xaq'
    },
    {
        title: '乐华音乐',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/labels/9.jpg',
        code: 'xaq'
    },
];

router.get('/', (req, res) => {
    res.render('list', {path: 'labels', list: labels});
});

module.exports = router;
