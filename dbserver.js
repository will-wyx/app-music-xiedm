/**
 * Created by WYX on 2016/12/25.
 */
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://xirecord:71906312@ds145178.mlab.com:45178/xirecord';
const dbserver = {
    ObjectId,
    news: (condition, callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('news');
            collection.find(condition).toArray((err, docs) => {
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
    newsAdd: () => {

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
    artists: (callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('artist');
            collection.find({}).toArray((err, docs) => {
                callback(docs);
            });
        });
    }
};

module.exports = dbserver;