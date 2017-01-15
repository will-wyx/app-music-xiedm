/**
 * Created by WYX on 2016/12/25.
 */
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
// const url = 'mongodb://xirecord:71906312@ds145178.mlab.com:45178/xirecord';
// const url = 'mongodb://192.168.8.119:27017/xirecord';
// const url = 'mongodb://192.168.1.253:27017/xirecord';
const url = 'mongodb://210.209.70.86:27017/xirecord';
const dbserver = {
    ObjectId,
    newsPaging: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('news');
            const {index, pagesize} = options;
            collection.count((countErr, count) => {
                collection.find({}, {content: false}).sort({date: -1}).skip((index - 1) * pagesize).limit(pagesize).toArray((err, docs) => {
                    callback(docs, count);
                });
            });
        });
    },
    news: (condition, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('news');
            collection.find(condition, {content: false}).toArray((err, docs) => {
                callback(docs);
            });
        });
    },
    newsOne: (condition, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('news');
            collection.findOne(condition, (err, docs) => {
                callback(docs);
            });
        });
    },
    artistOne: (_id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const coll_artist = db.collection('artist');
            coll_artist.findOne({_id}, (err, docs_artist) => {
                const coll_album = db.collection('album');
                const albums = docs_artist.albums || [];
                coll_album.find({_id: {'$in': albums}}, {name: true, cover: true}).toArray((err, docs_album) => {
                    docs_artist.albums = docs_album;
                    callback(docs_artist);
                });
            });
        });
    },
    mediaOne: (_id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('media');
            collection.findOne({_id}, (err, docs) => {
                callback(docs);
            });
        });
    },
    albumOne: (_id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('album');
            collection.findOne({_id}, (err, docs) => {
                callback(docs);
            });
        })
    },
    newsAdd: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('news');
            delete options.id;
            options.date = new Date();
            collection.insertOne(options, (err, r) => {
                callback(r);
            });
        });
    },
    artistAdd: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('artist');
            delete options.id;
            options.date = new Date();
            collection.insertOne(options, (err, r) => {
                callback(r);
            });
        });
    },
    albumAdd: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('album');
            delete options.id;
            collection.insertOne(options, (err, r) => {
                callback(r);
            });
        });
    },
    mediaAdd: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('media');
            delete options.id;
            options.date = new Date();
            collection.insertOne(options, (err, r) => {
                callback(r);
            });
        });
    },

    newsModify: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('news');
            const _id = ObjectId(options.id);
            delete options.id;
            collection.updateOne({_id}, {$set: options}, (err, r) => {
                callback(r);
            });
        });
    },
    newsDelete: (id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('news');
            const _id = ObjectId(id);
            collection.deleteOne({_id}, (err, r) => {
                callback(r);
            });
        });
    },
    artistDelete: (id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('artist');
            const _id = ObjectId(id);
            collection.deleteOne({_id}, (err, r) => {
                callback(r);
            });
        });
    },
    albumDelete: (id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('album');
            const _id = ObjectId(id);
            collection.deleteOne({_id}, (err, r) => {
                callback(r);
            });
        });
    },
    artist: (callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('artist');
            collection.find({}).toArray((err, docs) => {
                callback(docs);
            });
        });
    },
    artistQuery: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('artist');
            collection.find(options).toArray((err, docs) => {
                callback(docs);
            });
        });
    },
    artistPaging: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('artist');
            const {index, pagesize} = options;
            collection.count((countErr, count) => {
                collection.find({}, {
                    _id: true,
                    name: true,
                    date: true,
                    description: true,
                    icon: true
                }).sort({date: -1}).skip((index - 1) * pagesize).limit(pagesize).toArray((err, docs) => {
                    callback(docs, count);
                });
            });

        });
    },
    mediaPaging: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('media');
            const {index, pagesize} = options;
            collection.count((countErr, count) => {
                collection.find({}, {
                    _id: true,
                    title: true,
                    date: true,
                    timeLength: true,
                    path: true
                }).sort({date: -1}).skip((index - 1) * pagesize).limit(pagesize).toArray((err, docs) => {
                    callback(docs, count);
                });
            });

        });
    },
    albumPaging: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('album');
            const {index, pagesize} = options;
            collection.count((countErr, count) => {
                collection.find({}).skip((index - 1) * pagesize).limit(pagesize).toArray((err, docs) => {
                    callback(docs, count);
                })
            })
        });
    },
    audioOne: (_id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('media');
            collection.findOne({_id, type: 'audio'}, (err, docs) => {
                callback(docs);
            });
        });
    },
    // layout
    home: (callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('layout');
            collection.findOne({title: 'home'}, (err, docs) => {
                callback(docs);
            });
        });
    },
    generic: (title, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('layout');
            collection.findOne({title}, (err, docs) => {
                callback(docs);
            });
        });
    },
    checkauth: (data, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('manager');
            collection.findOne({name: data.name, pass: data.pass}, {name: true, role: true}, (err, docs) => {
                callback(docs);
            });
        })
    }
};

module.exports = dbserver;