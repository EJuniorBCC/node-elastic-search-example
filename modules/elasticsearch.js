var elasticsearch = require('elasticsearch');
var instance;
var index = 'index';

var getInstance = function() {
    if (typeof instance == 'undefined') {
        instance = new elasticsearch.Client({
            host: 'localhost:9200'
        });
    }

    return instance;
}
var client = getInstance();


var deleteIndex = function() {
    return client.indices.delete({
        index: index
    });
}

var createIndex = function() {
    return client.indices.create({
        index: index
    });
}

var indexExists = function() {
    return client.indices.exists({
        index: index
    });
}


var createDocument = function(doc) {
   var doc = {
    title:'titulo',
    content:'Elias Junior'
   }
    return client.index({
        index: index,
        type: "documents",
        body: {
            title: doc.title,
            content: doc.content,
            suggest: {
                input: doc.content.split(" "),
                output: doc.title,
                payload: {
                    content:doc
                }
            }
        }
    });
}

var search = function(query, callback) {

    return client.search({
        index: query.index,
        type: "documentss",
        body: {
            query: query.q
        }
    });
}


var suggest = function(query) {
    return client.suggest({
        index: index,
        type: 'documents',
        body: {
            docsuggest: {
                text: query,
                completion: {
                    field: "suggest",
                    fuzzy: true
                }
            }
        }
    });
}

var mapping = function() {
    return client.indices.putMapping({
        index: index,
        type: 'documents',
        body: {
            properties: {
                title: {
                    type: "string"
                },
                content: {
                    type: "string"
                },
                suggest: {
                    type: "completion",
                    analyzer: "simple",
                    search_analyzer: "simple",
                    payloads: true
                }
            }
        }
    });
}

var init = function(){
    indexExists()
    .then(function(success) {
      if (success) {
        return deleteIndex()
      }
    }).then(function() {
      return createIndex()
        .then(mapping)
        .then(function(success){
          console.log(success);
        }).catch(function(err){
          console.log(err);
        });
    });
}
module.exports = {
    createDocument: createDocument,
    search: search,
    suggest: suggest,
    mapping: mapping,
    indexExists:indexExists,
    deleteIndex:deleteIndex,
    createIndex:createIndex,
    init:init

};