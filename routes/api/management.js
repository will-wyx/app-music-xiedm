/**
 * Created by WILL on 2016/12/29.
 */
const express = require('express');
const router = express.Router();
const db = require('../../dbserver');

const multer = require('multer');
const layoutupload = multer({dest: "public/upload/layout"});

router.all('/*', (req, res, next) => {
    return next();
});
function authority(roles) {
    let role = {};
    if (roles)
        for (let i of roles) {
            role[i] = true
        }
    return role;
}
router.post('/login', (req, res) => {
    db.checkauth(req.body, (result) => {
        if (result) {
            let roles = result && result.role;
            result.role = authority(roles);
            // res.cookie('auth', result, {expires: new Date(Date.now() + 900000)});
            res.cookie('auth', result);
            res.json(true);
        }
    });
});

router.get('/news', (req, res) => {
    const {index, pagesize} = req.query;
    db.newsPaging({index: +index, pagesize: +pagesize}, (news) => {
        res.json(news);
    });
});

router.get('/artist', (req, res) => {
    const {index, pagesize} = req.query;
    db.artistPaging({index: +index, pagesize: +pagesize}, (artists) => {
        res.json(artists);
    });
});

router.get('/album', (req, res) => {
    const {index, pagesize} = req.query;
    db.albumPaging({index: +index, pagesize: +pagesize}, (albums) => {
        res.json(albums);
    });
});

router.get('/media', (req, res) => {
    const {index, pagesize} = req.query;
    db.mediaPaging({index: +index, pagesize: +pagesize}, (medias) => {
        res.json(medias);
    })
});

router.get('/form/business', (req, res) => {
    const {index, pagesize} = req.query;
    db.businessPaging({index: +index, pagesize: +pagesize}, (business) => {
        res.json(business);
    })
});

router.get('/form/contact', (req, res) => {
    const {index, pagesize} = req.query;
    db.contactPaging({index: +index, pagesize: +pagesize}, (business) => {
        res.json(business);
    })
});

router.get('/form/booking', (req, res) => {
    const {index, pagesize} = req.query;
    db.bookingPaging({index: +index, pagesize: +pagesize}, (business) => {
        res.json(business);
    })
});

router.get('/albums', (req, res) => {
    const options = req.query;
    db.albums(options, (albums) => {
        res.json(albums);
    })
});

router.get('/album-by-id', (req, res) => {
    const _id = db.ObjectId(req.query.id);
    db.albumOne(_id, (album) => {
        res.json(album);
    })
});

router.get('/albums-by-ids', (req, res) => {
    const data = req.query;
    db.albums_by_ids(data.chks, (albums) => {
        res.json(albums);
    });
    //{_id: {'$in': albums}
});

router.get('/audios-by-ids', (req, res) => {
    const data = req.query;
    db.audios_by_ids(data.chks, (audios) => {
        res.json(audios);
    })
});

router.get('/audios', (req, res) => {
    const options = req.query;
    db.audios(options, (audios) => {
        res.json(audios);
    });
});

router.post('/news', (req, res) => {
    db.newsAdd(req.body, (r) => {
        res.send('ok');
    });
});
router.post('/artist', (req, res) => {
    db.artistAdd(req.body, (r) => {
        res.send('ok');
    });
});

router.post('/album', (req, res) => {
    db.albumAdd(req.body, (r) => {
        res.send('ok');
    });
});

router.put('/news', (req, res) => {
    db.newsModify(req.body, (r) => {
        res.send('ok');
    });
});

router.put('/album', (req, res) => {
    db.albumModify(req.body, (r) => {
        res.send('ok');
    });
});

router.delete('/news', (req, res) => {
    db.newsDelete(req.body.id, (r) => {
        res.send(r);
    });
});
router.delete('/artist', (req, res) => {
    db.artistDelete(req.body.id, (r) => {
        res.send(r);
    });
});
router.delete('/label', (req, res) => {
    db.labelDelete(req.body.id, (r) => {
        res.send(r);
    })
});

router.delete('/album', (req, res) => {
    db.albumDelete(req.body.id, (r) => {
        res.send(r);
    });
});
router.delete('/media', (req, res) => {
    db.mediaDelete(req.body.id, (r) => {
        res.send(r);
    })
});


router.post('/layout-upload', layoutupload.single('file'), (req, res) => {
    req.body.path = req.file.path.substr(6);
    res.json({path: req.body.path});
});

module.exports = router;