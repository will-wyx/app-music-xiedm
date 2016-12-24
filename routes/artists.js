const express = require('express');
const router = express.Router();

const artists = [
    {
        title: '麦家瑜',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/1.jpg',
        code: 'xaq'
    },
    {
        title: '王菀之',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/2.jpg',
        code: 'oo'
    },
    {
        title: '中孝介',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/3.jpg',
        code: 'wwz'
    },
    {
        title: '谢安琪',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/4.jpg',
        code: 'xaq'
    },
    {
        title: 'Leessang',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/5.jpg',
        code: 'xaq'
    },
    {
        title: '不知名',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/6.jpg',
        code: 'xaq'
    },
    {
        title: '黄丽玲',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/7.jpg',
        code: 'xaq'
    },
    {
        title: '莫文蔚',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/8.jpg',
        code: 'xaq'
    },
    {
        title: '张靓颖',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/9.jpg',
        code: 'xaq'
    },
    {
        title: '张敬轩',
        description: '华纳音乐集团是21世纪世界三大唱片公司之一，原隶属于拥有华纳兄弟影片公司、时代杂志、财富杂志、CNN有线电视新闻网等传媒巨子的时代华纳集团，在众多行业有着卓越的成就。',
        icon: '/images/artists/10.jpg',
        code: 'xaq'
    }
];
/* GET users listing. */
router.get('/', (req, res) => {
    res.render('list', {path: 'artists', list: artists});
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const bkurl = `/images/upload/${id}.jpg`;
    res.render('artist', {bkurl});
});

module.exports = router;
