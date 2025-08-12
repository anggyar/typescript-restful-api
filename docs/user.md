# User Api Spec

## Register User

Endpont: POST /api/users

Request Body :

```json
{
    "username": "anggyar",
    "password": "rahasia",
    "name": "Anggyar Muhamad Yahya"
}
```

Response Body (Success):

```json
{
    "data": {
        "username": "anggyar",
        "name": "Anggyar Muhamad Yahya"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "username must not blank"
}
```

## Login User

Endpont: POST /api/users/login

Request Body :

```json
{
    "username": "anggyar",
    "password": "rahasia"
}
```

Response Body (Success):

```json
{
    "data": {
        "username": "anggyar",
        "name": "Anggyar Muhamad Yahya",
        "token": "uuid"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Username or password is wrong"
}
```

## Get User

Endpont: GET /api/users/current
Request Header:

-   X-API-TOKEN: token

Response Body (Success):

```json
{
    "data": {
        "username": "anggyar",
        "name": "Anggyar Muhamad Yahya"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Unauthorized"
}
```

## Update User

Endpont: PATCH /api/users/current

Request Header:

-   X-API-TOKEN: TOKEN

Request Body:

```json
{
    "name": "Anggyar Lagi",
    "password": "rahasia baru"
}
```

Response Body (Success):

```json
{
    "data": {
        "username": "anggyar",
        "name": "Anggyar Muhamad Yahya"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Unauthorized"
}
```

## Logout User

Endpont: DELETE /api/users/current

Request Header:

-   X-API-TOKEN: TOKEN

Request Body:

```json
{
    "data": "OK"
}
```

Response Body (Success):

```json
{
    "data": {
        "username": "anggyar",
        "name": "Anggyar Muhamad Yahya"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Unauthorized"
}
```
