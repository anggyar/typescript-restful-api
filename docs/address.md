# Address API Spec

<!-- !CREATE ADDRESS -->

## Create Address

Endpoint: POST api/contacts/:idContact/addresses

Request Header:

-   X-API-TOKEN: token

Request Body:

```json
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "123123"
}
```

Response Body (Success):

```json
{
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "123123"
    }
}
```

Response Body (Failed):

```json
{
    "message": "Unauthorized"
}
```

<!-- ! GET ADDRESS -->

## Get Address

Endpoint: GET api/contacts/:idContact/addresses/:idAddresses

Request Header:

-   X-API-TOKEN: token

Response Body:

```json
{
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "123123"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "postal_code is required"
}
```

<!-- !UPDATE ADDRESS -->

## Update Address

Endpoint: PUT api/contacts/:idContact/addresses/:idAddress

Request Header:

-   X-API-TOKEN: token

Request Body:

```json
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "123123"
}
```

Response Body (Success):

```json
{
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "123123"
    }
}
```

Response Body (Failed):

```json
{
    "message": "Unauthorized"
}
```

<!-- !REMOVE ADDRESS -->

## Remove Address

Endpoint: GET api/contacts/:idContact/addresses/:idAddress

Request Header:

-   X-API-TOKEN: token

Response Body (Success):

```json
{
    "data": "OK"
}
```

Response Body (Failed):

```json
{
    "message": "Address is not found"
}
```

<!-- ! LIST ADDRESS -->

## List Address

Endpoint: GET api/contacts/:idContact/addresses

Request Header:

-   X-API-TOKEN: token

Response Body (Success):

```json
{
    "data": [
        {
            "id": 1,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Provinsi apa",
            "country": "Negara apa",
            "postal_code": "123123"
        },
        {
            "id": 2,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Provinsi apa",
            "country": "Negara apa",
            "postal_code": "123123"
        }
    ]
}
```

Response Body (Failed):

```json
{
    "message": "Contact is not found"
}
```
