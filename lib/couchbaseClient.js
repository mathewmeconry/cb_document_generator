var couchbase = require('couchbase');

function couchbaseClient(url, bucket) {
    this.cluster = new couchbase.Cluster('couchbase://127.0.0.1')
    this.bucket = this.cluster.openBucket('default')
}

couchbaseClient.prototype.upsert = function (key, value, callback) {
    this.bucket.upsert(key, value, function (err, result) {
        if (err) {
            console.error(err)
        }
        callback(err, result)
    })
}

couchbaseClient.prototype.get = function (key, callback) {
    this.bucket.get(key, function (err, result) {
        if (err) {
            console.error(err)
        }
        callback(err, result)
    })
}

module.exports = couchbaseClient