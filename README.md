# Feathers Secure Web Service Example

## Description

This is a simple example application that provides a web service with a RESTful API
for listing and searching for employees in a database. The project has the following
characteristics:

- Feathers: uses the [Feathers][1] v2.x framework
- RESTful: uses Feathers' [RESTful][2] features which dynamically create an API
- Secure: uses Feathers' [local][3] and [JWT][4] authentication mechanisms
- Database: uses Feathers' integration with [Sequelize][5], a promise-based ORM for
  Node.js that can interact with several relational databases

## Object Model

```
Employee: id, username, firstName, lastName
User:     id, username, password
```

The User object is used for securing the application. The Employee object is the
data we are interested in querying.

This web service may be consumed by another application, instead of a person
using a web browser. Thus, the User object could actually represent either an
application or a person.

## RESTful API

The primary service, `src/services/employee/index.js`, provides an asynchronous interface
to the employee data. [more details to follow]

## Security

Authentication is is performed against a sequelize/sqlite User database. Once the
proper credentials are confirmed, a JSON Web Token is returned to the client for
authentication in subsequent calls.

To secure the communication between the client app and this web service, just
use SSL/HTTPS on the web server.

## Usage

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/)
   installed.
2. Install your dependencies
    ```sh
    cd path/to/employees; npm install
    ```
3. Start your app
    ```sh
    npm start
    ```
4. Use `curl`, for example, to test the API:
   ```sh
   # login and get authorization token
   $ curl -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}' http://localhost:8080/authentication

   # response
   {"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjAsImlhdCI6MTQ4ODM3OTg3NSwiZXhwIjoxNDg4NDY2Mjc1LCJhdWQiOiJodHRwczovL3lvdXJkb21haW4uY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiJhbm9ueW1vdXMifQ.lvAa-ncxAidKsh3os_t6pShmuOh0oOglI6YxyvhknYI"}

   # use the returned token to find employees
   $ curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjAsImlhdCI6MTQ4ODM3OTg3NSwiZXhwIjoxNDg4NDY2Mjc1LCJhdWQiOiJodHRwczovL3lvdXJkb21haW4uY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiJhbm9ueW1vdXMifQ.lvAa-ncxAidKsh3os_t6pShmuOh0oOglI6YxyvhknYI" "http://localhost:3030/employees?lastName=Crosby"

   # response
   [{"id":"88","firstName":"Hyacinth","lastName":"Crosby","username":"HCrosby"},{"id":"90","firstName":"Caryn","lastName":"Crosby","username":"CCrosby"}]
   ```

## Testing

Simply run `npm test` and all the tests in the `test/` directory will be run. 
So far, the only original tests are located in `test/services/employee/rest.test.js`. 
They include local and jwt authentication.

## TODO

1. More tests!
2. Ensure that a client cannot create a new User.
3. Remove duplicate initialization of user service (in `src/services/user/index.js` 
   and `src/services/authentication/index.js`).
4. Add support and tests for web sockets.

## Miscellaneous

Sample data is loaded from a JSON file during Bootstrap. It was obtained from
[generatedata.com][6]. Bookmark that site. You're welcome ;-)

[1]: https://feathersjs.com/
[2]: https://docs.feathersjs.com/rest/readme.html
[3]: https://docs.feathersjs.com/authentication/local.html
[4]: https://docs.feathersjs.com/authentication/token.html
[5]: https://docs.feathersjs.com/databases/sequelize.html
[6]: http://generatedata.com/

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
