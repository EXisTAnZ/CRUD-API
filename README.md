# CRUD-API
[RS School node.js task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Description
Simple CRUD API implemented on TS

### Instalation 
Clone this repository and run ``npm install``.

To start program in dev mode use ``start:dev`` script,  
for build and run prod mode use ``start:prod`` script
```
npm run start:dev
```
or
```
npm run start:prod
```
By default server started at 3000 port, but you can specify it in .env file

## The server has the following functionality:

 <details>
  <summary> endpoint api/users </summary>
- GET api/users - return all users records
- GET api/users/userId - return user by Id
- POST api/users - create new user
- PUT api/users/userId - update user
- DELETE api/users/userId - delete user

</details>
 <details>
  <summary> in-memory database </summary>
  all data saved in RAM and reset on restart server
</details>

 <details>
  <summary> tests </summary>
  Unfortunately, it's too late for writing tests.
</details>