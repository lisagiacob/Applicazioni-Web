# `qa-server`

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List all questions__

URL: `/api/questions`	//colleazione delle domande

HTTP Method: GET.

Description: Retrieve all questions.

Request body: 		//no perchè è una GET

Response: `200 OK` (success) or `500 International Server Error` (generic error).

Response body: 		//array di oggetti
```
[
	{
		"id": 1,
		"text": "Is JS better than Python",
		"email": "luigi.derussis@polito.it",
		"date": "2027-02-07"
	},
	...
]
```

### __Get a single question__

URL: `/api/questions/<id>`	

HTTP Method: GET.

Description: Retrieve a single question represented by `<id>`.

Request body: 		//no perchè è una GET

Response: `200 OK` (success), `500 International Server Error` (generic error) or `404 Not Found` (wrong id).

Response body: 		//array di oggetti
```
{
	"id": 1,
	"text": "Is JS better than Python",
	"email": "luigi.derussis@polito.it",
	"date": "2027-02-07"
}

```

### __Get all answers of a single question__

URL: `/api/questions/<id>/answers`	

HTTP Method: GET.

Description: Retrieve all answers of a single question represented by `<id>`.

Request body: 		//no perchè è una GET

Response: `200 OK` (success), `500 International Server Error` (generic error) or `404 Not Found` (wrong id).

Response body: 		//array di oggetti
```
[
	{
		"id": 1,
		"text": "Yes",
		"email": "luca.mannella@polito.it",
		"score": -10
		"date": "2024-02-08"
	},
	...
]
```

### __Create a new answer for a given questions__

URL: `/api/questions/<id>/answers` or `/api/answers` //così però nel body dobbiamo avere il question id

HTTP Method: POST.

Description: Create an answer for a single question represented by `<id>`.

Request body:
```
{
		"text": "Last year, it had about 2020 first-timers",
		"email": "luca.mannella@polito.it",
		"score": 0
		"date": "2024-03-26"
}
```

Response: `201 Created` (success, with created id), `503 Service Unavaiable` (generic error) or `404 Not Found` (wrong id). If the request body is not valid, `422 Unprocessable Entity` (validation Error).

Response body: __None__