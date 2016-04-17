# promise-battlenet-api

A basic client for the Blizzard Battle.net api using request-promise. Does not currently support protected resources. Currently only support WoW resources.

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

* 0.1.2 add responseTime to request response
* 0.1.0 initial release