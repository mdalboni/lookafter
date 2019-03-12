# Feracode Python Test

## Resume

As requested the Front-end and the Back-end were made. The front is a sample API with all the requested calls and some extras.

### Requirements
- Python 3.6+
- Django 2+
- djangorestframework	

## APIs
- Login
- Auth Login
- Insert Single
- Update Single
- Remove Single
- Remove Many
- Query Single
- Query Many
- Query by filter and count

#### Expected Usage
 
 Except for the **Login API** all API calls will expect the Authorization token in the Header.

````
Authorization : "Token {token_hash}"
````
>This is the Django REST Framework default auth system.
 

#### Login
>URL: [ /api/login/ ] <br>
Method: POST

#####Body
```
{
	"username": "admin",
	"password": "admin"
}
```

#####Response
```
{
  "token": "04bc56e937702182874beab770d5bac470ec0244",
  "user": {
    "name": "admin",
    "last_login": "2019-03-10T01:57:05.036315Z",
    "email": "admin@admin.com"
  }
}
```

#### Authenticate
>URL: [ /api/auth/ ] <br>
Method: GET

#####Body
```
```

#####Response
```
{
  "token": "04bc56e937702182874beab770d5bac470ec0244",
  "user": {
    "name": "admin",
    "last_login": "2019-03-10T01:57:05.036315Z",
    "email": "admin@admin.com"
  }
}
```

#### Insert Single
>URL: [ /api/diaper/ ] <br>
Method: PUT

#####Body
```
{
  "name": "Pampers",
  "model": "Premium",
  "size": "S"
}
```

#####Response
```
{
  "id": 1,
  "name": "Pampers",
  "model": "Premium",
  "size": "S"
}
```

#### Update Single
>URL: [ /api/diaper/< int:pk > ] <br>
Method: PUT

#####Body
```
{
  "name": "Pampers",
  "model": "Premium",
  "size": "M"
}
```

#####Response
```
{
  "id": 1,
  "name": "Pampers",
  "model": "Premium",
  "size": "M"
}
```

#### Remove Single
>URL: [ /api/diaper/< int:pk > ] <br>
Method: DELETE

#####Body
```
```

#####Response
```
{}
```

#### Remove Many
>URL: [ /api/diaper/ ] <br>
Method: DELETE

#####Body
```
{
	"diapers":[
	    1,2,3,4
	]
}
```

#####Response
```
{}
```

#### Query Single
>URL: [ /api/diaper/< int:pk > ] <br>
Method: GET

#####Body
```
```

#####Response
```
{
  "id": 1,
  "name": "Pampers",
  "model": "Premium",
  "size": "S"
}
```

#### Query Many
>URL: [ /api/diaper/ ] <br>
Method: GET

#####Body
```
```

#####Response
```
{
  "diapers": [
    {
      "id": 1,
      "name": "Pampers",
      "model": "Premium",
      "size": "S"
    },
    {
      "id": 2,
      "name": "Pampers",
      "model": "Confort",
      "size": "M"
    }
  ]
}
```

#### Query by filter and count
>URL: [ /api/diaper/ ] <br>
Method: POST

#####Body
```
{
	"query" : "model",
	"search" : "Premium"
}
/*OR*/
{
	"query" : "size",
	"search" : "S"
}

```

#####Response
```
{
  "total": 5,
  "query": 1
}
```