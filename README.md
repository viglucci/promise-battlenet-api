# promise-battlenet-api

A basic client for the Blizzard Battle.net api using request-promise. Does not currently support protected resources. Currently only support WoW resources.

## Installation
    npm install promise-battlenet-api --save

## Configuration

### Basic Setup    
    var bnet = require("promise-battlenet-api");
    var client = new bnet({
        apikey: "your_api_key_here",
    });
    
### Change your apikey at any time
    client.setApiKey("your_api_key_here");

### Enable Throttling
    var bnet = require("promise-battlenet-api");
    var client = new bnet({
        apikey: "your_api_key_here",,
        throttle: {
            to: 99,   // the number of calls
            per: 1000 // the timeframe in milliseconds
        }
    });

If for example, your apikey is limited to 100 calls a second, you should configure the client to perform 99 or less api calls per 1000 milliseconds (1 second). This allows for just a slight buffer to avoid edge cases. 

If you are requesting api calls faster than the set throttle, subsequent calls be will queued to be executed once the throttle duration has expired.

Throttling uses [xavi-/node-simple-rate-limiter](https://github.com/xavi-/node-simple-rate-limiter) under the hood.

## Usage

### Query basic character information
    client.fetch("character", { 
            region: "us", 
            realm: "emerald-dream", 
            name: "talgees" 
        })
       .then(function printData (data) {
            console.log(data);
        })
        .catch(console.error);

### Query basic character information + stats + items
    client.fetch("character", { 
            region: "us", 
            realm: "emerald-dream", 
            name: "talgees",
            fields: "stats,items"
        })
        .then(function printData (data) {
            console.log(data);
        })
        .catch(console.error);

### Query basic character information using a specific apikey
    client.fetch("character", {
            apikey: "your_api_key_here",
            region: "us", 
            realm: "emerald-dream", 
            name: "talgees"
        })
        .then(function printData (data) {
            console.log(data);
        })
        .catch(console.error);

## Release History

* 0.1.2 add responseTime to request response
* 0.1.0 initial release

## License

The MIT License (MIT)

Copyright (c) 2015 Kevin Viglucci

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

