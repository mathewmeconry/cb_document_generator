# cb_document_generator
Little nodejs application to create massive amout of documents in couchbase
<br><br>
## Command
cbdg is the commandline executable

## Parameters
  --threads / -t [underline](number of concurrent threads)   Spawn new child processes                                                     
  --server / -s servername                                   Servername                                                                    
  --bucket / -b bucketname                                   bucketname (default value: default)                                                                    
  --count / -c count                                         How many documents should be written (If not defined or set to 0 = unlimited)   
  --jsonTemplate / -j path                                   Path to the json template. (default value: defaultTemplate.json of the repo) Definition help: https://github.com/webroo/dummy-json                                                            json#getting-started                                                          
  --help / -h                                                Print this usage guide.  
<br><br>

If you need more just create a feature request  
## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## License
MIT