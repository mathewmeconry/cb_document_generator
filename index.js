#!/usr/bin/env node

var commandLineArgs = require('command-line-args')
var getUsage = require('command-line-usage')
var child_process = require('child_process');

process.on('exit', () => {
    console.log('\n')
})

const optionDefinitions = [
    { name: 'threads', alias: 't', type: Number, defaultValue: 1 },
    { name: 'server', alias: 's', type: String },
    { name: 'bucket', alias: 'b', type: String, defaultValue: 'default' },
    { name: 'count', alias: 'c', type: Number, defaultValue: 0 },
    { name: 'jsonTemplate', alias: 'j', type: String, defaultValue: './defaultTemplate.json' },
    { name: 'help', alias: 'h', type: Boolean, defaultValue: false }
]

const options = commandLineArgs(optionDefinitions)

if (options.help) {
    printUsage()
    process.exit(0)
}

if (options.server) {
    var children = [];
    for (var i = 0; i < options.threads; i++) {
        console.log('Spawning Thread ' + (i + 1) + ' of ' + options.threads)
        children.push(child_process.fork('./lib/worker', [options.jsonTemplate, options.count, options.server, options.bucket]))
    }
} else {
    printUsage()
}

function printUsage() {
    const sections = [
        {
            header: 'Couchbase Random Document Generator',
            content: 'Fillsup a Couchbase Bucket with random documents'
        },
        {
            header: 'Options',
            optionList: [
                {
                    name: 'threads / -t',
                    typeLabel: '[underline](number of concurrent threads)',
                    description: 'Spawn new child processes'
                },
                {
                    name: 'server / -s',
                    typeLabel: '[underline]{servername}',
                    description: 'Servername'
                },
                {
                    name: 'bucket / -b',
                    typeLabel: '[underline]{bucketname}',
                    description: 'bucketname'
                },
                {
                    name: 'count / -c',
                    typeLabel: '[underline]{count}',
                    description: 'How many documents should be written (If not defined or set to 0 = unlimited)'
                },
                {
                    name: 'jsonTemplate / -j',
                    typeLabel: '[underline]{path}',
                    description: 'Path to the json template. Definition help: https://github.com/webroo/dummy-json#getting-started'
                },
                {
                    name: 'help / -h',
                    description: 'Print this usage guide.'
                }
            ]
        }
    ]
    console.log(getUsage(sections))
}