# promise-battlenet-api

A basic client for the Blizzard Battle.net api using promise-request. Does not currently support protected resources.

## Installation
    npm install promise-battlenet-api --save

### Create the client
    var bnet = require("promise-battlenet-api");
    var client = new bnet();
    client.setApiKey(api_key);

### Query basic character information
    client.fetch("character", { region: "us", realm: "emerald-dream", name: "talgees" })
        .then(function(data){
            console.log(data);
        })
        .catch(console.error);

### Query basic character information + stats + items
    client.fetch("character", { region: "us", realm: "emerald-dream", name: "talgees", fields: "stats,items" })
        .then(function(data){
            console.log(data);
        })
        .catch(console.error);

## Release History

* 0.0.3 Add support for fields
* 0.0.2 Initial alpha release