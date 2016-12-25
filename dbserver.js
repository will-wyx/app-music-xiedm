/**
 * Created by WYX on 2016/12/25.
 */
// sqlite
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sqlite3.db');
const dbserver = {
    news: (operation, callback) => {
        const fields = operation2fields(operation);
        const sql = `SELECT ${fields} FROM "news"`;
        db.serialize(() => {
            db.all(sql, (err, res) => {
                callback(res);
            });
        })
    },
    artists: (operation, callback) => {
        const fields = operation2fields(operation);
        const sql = `SELECT ${fields} FROM "artist"`;
        db.serialize(() => {
            db.all(sql, (err, res) => {
                callback(res);
            });
        });
    }
};

function operation2fields(operation) {
    let fields = '*';
    if (operation instanceof Array) {
        fields = operation.join(',');
    }
    return fields;
}
module.exports = dbserver;