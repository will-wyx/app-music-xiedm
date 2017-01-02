/**
 * Created by WYX on 2016/12/25.
 */
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
// const url = 'mongodb://xirecord:71906312@ds145178.mlab.com:45178/xirecord';
const url = 'mongodb://localhost:27017/xirecord';
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
            const collection = db.collection('artist');
            collection.findOne({_id}, (err, docs) => {
                callback(docs);
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
    artist: (callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('artist');
            collection.find({}).toArray((err, docs) => {
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
    }
};

module.exports = dbserver;