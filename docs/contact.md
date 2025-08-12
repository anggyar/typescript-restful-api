# Contact API Spec

## Create Contact

Endpoint: POST /api/contacts

Request Header :

-   X-API-TOKEN: token

Request Body:

```json
{
    "first_name": "Anggyar",
    "last_name": "Muhamad Yahya",
    "email": "anggyar@mail.com",
    "phone": "0811111111"
}
```

Response Body (Success):

```json
{
    "data": {
        "id": 1,
        "first_name": "Anggyar",
        "last_name": "Muhamad Yahya",
        "email": "anggyar@mail.com",
        "phone": "0811111111"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "first_name must not be blank, ..."
}
```

## Get Contact

Endpoint: GET /api/contacts

Request Header :

-   X-API-TOKEN: token

Response Body (Success):

```json
{
    "data": {
        "id": 1,
        "first_name": "Anggyar",
        "last_name": "Muhamad Yahya",
        "email": "anggyar@mail.com",
        "phone": "0811111111"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Contact is not found"
}
```

## Update Contact

Endpoint: PUT /api/contacts/:id

Request Header :

-   X-API-TOKEN: token

Request Body:

```json
{
    "first_name": "Anggyar",
    "last_name": "Muhamad Yahya",
    "email": "anggyar@mail.com",
    "phone": "0811111111"
}
```

Response Body (Success):

```json
{
    "data": {
        "id": 1,
        "first_name": "Anggyar",
        "last_name": "Muhamad Yahya",
        "email": "anggyar@mail.com",
        "phone": "0811111111"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "first_name must not be blank, ..."
}
```

## Remove Contact

Endpoint: DELETE /api/contacts/:id

Request Header :

-   X-API-TOKEN: token

Response Body (Success):

```json
{
    "data": {
        "id": 1,
        "first_name": "Anggyar",
        "last_name": "Muhamad Yahya",
        "email": "anggyar@mail.com",
        "phone": "0811111111"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "first_name must not be blank, ..."
}
```

## Search Contact

Endpoint: GET /api/contacts

Query Parameter:

-   name: string, contact first name or contact last name, optional
-   phone: string, contact phone, optional
-   email: string, contact email, optional
-   page: number, default 1
-   size: number, default 10

Request Header :

-   X-API-TOKEN: token

Response Body (Success):

```json
{
    "data": [
        {
            "id": 1,
            "first_name": "Anggyar",
            "last_name": "Muhamad Yahya",
            "email": "anggyar@mail.com",
            "phone": "0811111111"
        },
        {
            "id": 2,
            "first_name": "Budi",
            "last_name": " Yahya",
            "email": "budi@mail.com",
            "phone": "0822222"
        }
    ],
    "paging": {
        "current_page": 1,
        "total_page": 10,
        "size": 10
    }
}
```

Response Body (Failed):

```json
{
    "errors": "first_name must not be blank, ..."
}
```
