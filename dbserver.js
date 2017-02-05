/**
 * Created by WYX on 2016/12/25.
 */
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const tr = require('transliteration');
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
                if (docs_artist) {
                    const coll_album = db.collection('album');
                    const albums = docs_artist.albums || [];
                    coll_album.find({_id: {'$in': albums}}).toArray((err, docs_album) => {
                        docs_artist.albums = docs_album;
                        const coll_audio = db.collection('media');
                        const audios = docs_artist.audios || [];
                        coll_audio.find({_id: {'$in': audios}}).toArray((err, docs_audio) => {
                            docs_artist.audios = docs_audio;
                            callback(docs_artist);
                        })
                    });
                } else {
                    callback({});
                }
            });
        });
    },
    labelOne: (_id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const coll_artist = db.collection('label');
            coll_artist.findOne({_id}, (err, docs_artist) => {
                const coll_album = db.collection('album');
                const albums = docs_artist.albums || [];
                coll_album.find({_id: {'$in': albums}}).toArray((err, docs_album) => {
                    docs_artist.albums = docs_album;
                    const coll_audio = db.collection('media');
                    const audios = docs_artist.audios || [];
                    coll_audio.find({_id: {'$in': audios}}).toArray((err, docs_audio) => {
                        docs_artist.audios = docs_audio;
                        callback(docs_artist);
                    })
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
            options.name = options.name.trim();
            options.prefix = tr.slugify(options.name).substr(0, 1);
            if (options.audios && options.audios.length) {
                options.audios = options.audios.map(e => {
                    return ObjectId(e);
                });
            }
            if (options.albums && options.albums.length) {
                options.albums = options.albums.map(e => {
                    return ObjectId(e);
                });
            }
            delete options.id;
            options.date = new Date();
            collection.insertOne(options, (err, r) => {
                callback(r);
            });
        });
    },
    labelAdd: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('label');
            options.name = options.name.trim();
            options.prefix = tr.slugify(options.name).substr(0, 1);
            if (options.audios && options.audios.length) {
                options.audios = options.audios.map(e => {
                    return ObjectId(e);
                });
            }
            if (options.albums && options.albums.length) {
                options.albums = options.albums.map(e => {
                    return ObjectId(e);
                });
            }
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
    albumModify: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('album');
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
    labelDelete: (id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('label');
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
    mediaDelete: (id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('media');
            const _id = ObjectId(id);
            collection.deleteOne({_id}, (err, r) => {
                callback(r);
            })
        })
    },
    artist: (callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('artist');
            collection.find({}).toArray((err, docs) => {
                callback(docs);
            });
        });
    },
    label: (callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('label');
            collection.find({}).toArray((err, docs) => {
                callback(docs);
            });
        });
    },
    search: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const
                collection_artist = db.collection('artist'),
                collection_label = db.collection('label');
            collection_artist.find(options).toArray((aerr, adocs) => {
                collection_label.find(options).toArray((lerr, ldocs) => {
                    adocs = adocs.map(e => {
                        e.type = 'artists';
                        return e;
                    });
                    ldocs = ldocs.map(e => {
                        e.type = 'labels';
                        return e;
                    });
                    const docs = [...adocs, ...ldocs];
                    callback(docs);
                })
            })
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
    labelPaging: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('label');
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
    businessPaging: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('business');
            const {index, pagesize} = options;
            collection.count((countErr, count) => {
                collection.find().skip((index - 1) * pagesize).limit(pagesize).toArray((err, docs) => {
                    callback(docs, count);
                })
            })
        })
    },
    contactPaging: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('content');
            const {index, pagesize} = options;
            collection.count((countErr, count) => {
                collection.find().skip((index - 1) * pagesize).limit(pagesize).toArray((err, docs) => {
                    callback(docs, count);
                })
            })
        })
    },
    bookingPaging: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('content');
            const {index, pagesize} = options;
            collection.count((countErr, count) => {
                collection.find().skip((index - 1) * pagesize).limit(pagesize).toArray((err, docs) => {
                    callback(docs, count);
                })
            })
        })
    },
    albums: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('album');
            collection.find(options).toArray((err, docs) => {
                callback(docs);
            });
        })
    },
    albums_by_ids: (chks, callback) => {
        let albums = [];
        for (let item of chks) {
            albums.push(ObjectId(item));
        }
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('album');
            collection.find({_id: {'$in': albums}}).toArray((err, docs) => {
                callback(docs);
            });
        })
    },
    audios_by_ids: (chks, callback) => {
        let audios = [];
        for (let item of chks) {
            audios.push(ObjectId(item));
        }
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('media');
            collection.find({_id: {'$in': audios}}).toArray((err, docs) => {
                callback(docs);
            });
        })
    },

    audioOne: (_id, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('media');
            collection.findOne({_id}, (err, docs) => {
                callback(docs);
            });
        });
    },
    audios: (options, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('media');
            collection.find(options).toArray((err, docs) => {
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
    },
    businessAdd: (data, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('business');
            collection.insertOne(data, (err, r) => {
                callback(r);
            })
        });
    },
    contactAdd: (data, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('contact');
            collection.insertOne(data, (err, r) => {
                callback(r);
            })
        });
    },
    bookingAdd: (data, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('booking');
            collection.insertOne(data, (err, r) => {
                callback(r);
            })
        });
    }
};

module.exports = dbserver;
