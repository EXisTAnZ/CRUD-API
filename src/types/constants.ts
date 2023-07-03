export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export enum ERROR_MSG {
  LOGIN_USED = 'User with this login already registered',
  INVALID_USER_ID = 'Invalid userID',
  USER_NOT_FOUND = 'User not found',
  INVALID_ROUTE = 'This api doesnt exist',
  INVALID_URL = 'Invalid url',
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  SUCCESS = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
