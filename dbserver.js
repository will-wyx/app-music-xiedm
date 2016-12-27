/**
 * Created by WYX on 2016/12/25.
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://xirecord:71906312@ds145178.mlab.com:45178/xirecord';
const dbserver = {
    news: (callback) => {
        MongoClient.connect(url, (err, db) => {
            const collection = db.collection('news');
            collection.find({}).toArray((err, docs) => {
                callback(docs);
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