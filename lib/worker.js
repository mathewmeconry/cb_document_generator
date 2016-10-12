var couchbaseClient = require('./couchbaseClient')
var dummyjson = require('dummy-json')
var fs = require('fs')
var randomstring = require("randomstring");
var ProgressBar = require('progress');

var options = {
    jsonTemplate: process.argv[2],
    count: process.argv[3],
    server: process.argv[4],
    bucket: process.argv[5]
}

fs.readFile(options.jsonTemplate, { encoding: 'utf-8' }, (err, result) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }

    var cbClient = new couchbaseClient(options.server, options.bucket)
    if (options.count > 0) {
        var bar = new ProgressBar('  spamming [:bar] :percent :etas', {
            complete: '=',
            width: 20,
            total: parseInt(options.count)
        });

        for (var i = 0; i < options.count; i++) {
            process.nextTick(() => {
                cbClient.upsert(randomstring.generate(), dummyjson.parse(result), (err, result) => {
                    bar.tick(bar.curr + 1)
                    if (bar.complete) {
                        process.exit(0)
                    }
                })
            })
        }
    } else {
        setInterval(() => {
            process.stdout.write('.')
        }, 800)

        setInterval(() => {
            cbClient.upsert(randomstring.generate(), dummyjson.parse(result), (err, result) => { })
        }, 5)
    }
})