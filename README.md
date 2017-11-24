# JSON-digger

#### maintainer: [Tomer Raz](quittyband@gmail.com)

## Overview

This service will perform deep-analysis of the difference between two json blocks, 
giving precedence to some well-established developer conventions.

It will scan through nested blocks, and attempt to deep-scan array elements 
to determine which of them are comparable based on common keys (more on this below).

## Deployment

* Check configuration under /config/default.json
* ```$ npm install; node app.js```

## Routes

```
GET /
```
Main user access point
***
```
GET /alive
```
***
```
POST /analyze
content-type: application/json
```
_Will compare the values of two keys found in the message body: "before" and "after",
and return a JSON dump of paths and changes._

##### Example:

```
{
    "before": {
        "key": "oldValue",
        "list": [
            {
                "id": "nestedBlock",
                "status": "old"
            },
            {
                "another": "nestedBlock"
            }
        ]
    },
    "after": {
        "key": "newValue",
        "list": [
            {
                "id": "nestedBlock"m
                "status": "new"
            },
            {
                "another": "nestedBlock"
            }
        ]
    } 
}
```

## Known issues

### Major

* Does not support duplicate values in lists
* Formatter module not yet implemented

### Minor

* Added values in nested lists will appear both as value and in key
* Possibly more
* Code needs cleanup
