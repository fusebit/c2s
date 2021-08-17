# c2s

This is a service supporting CRUD operations on a database of cats. It may not be fully implemented and may contain an occasional bug. 

## Getting started

```
git clone git@github.com:fusebit/c2s.git
cd c2s
npm i
DEBUG=c2s:* npm start
```

The service endpoints described below are available at http://localhost:3000.

## API

### POST /cat

Adds a new cat to the database based on the data in the `application/json` request body: 

```json
{
    "name": "{name}",
    "breed": "{breed}",
    "color": "{color}",
    "tags": {
        "{key1}": "{value1}",
        "{keyN}": "{valueN}"
    }
}
```

The HTTP 200 response will reflect back the input data with an addition of the unique cat ID: 

```json
{
    "id": "{id}",
    "name": "{name}",
    "breed": "{breed}",
    "color": "{color}",
    "tags": {
        "{key1}": "{value1}",
        "{keyN}": "{valueN}"
    }
}
```

### GET /cat/:id

Returns HTTP 200 with a cat with the specified ID, or 404 if the cat is not found. 

```json
{
    "id": "{id}",
    "name": "{name}",
    "breed": "{breed}",
    "color": "{color}",
    "tags": {
        "{key1}": "{value1}",
        "{keyN}": "{valueN}"
    }
}
```

### DELETE /cat/:id

Deletes a cat in the dabatase and returns HTTP 204, or returns 404 if the cat was not found. 

### GET /cat?count={count}&next={next}&name={name}&breed={breed}&color={color}

Returns a list of cats matching the search criteria. All query params are optional: 

* **count** - return up to *count* cats in the result
* **next** - an opaque token from the previous response to this API to continue paging from
* **name**, **breed**, **color** - search criteria (all must be met if specified)

The HTTP 200 response contains the list of matching cats and an optional `next` property indicating more results are available. If the `next` property is present, the caller may include it as a query parameter in the subsequent call to this API to get more cats. 

```json
{ 
    "items": [
        {
            "id": "{id1}",
            "name": "{name}",
            "breed": "{breed}",
            "color": "{color}",
            "tags": {
                "{key1}": "{value1}",
                "{keyN}": "{valueN}"
            }
        },
        {
            "id": "{id2}",
            "name": "{name}",
            "breed": "{breed}",
            "color": "{color}",
            "tags": {
                "{key1}": "{value1}",
                "{keyN}": "{valueN}"
            }
        }
    ],
    "next": 7
}
```
