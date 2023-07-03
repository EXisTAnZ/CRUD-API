import { IncomingMessage, ServerResponse } from 'http';
import DBEngine from '../db/engine';
import { v4, validate } from 'uuid';
import { parseReq } from './utils';
import { ERROR_MSG, HTTP_STATUS } from '../types/constants';

export default class Controller {
  private dbEngine: DBEngine;

  constructor() {
    this.dbEngine = new DBEngine();
  }

  public async get(_: IncomingMessage, res: ServerResponse, id?: string) {
    if (!id) {
      this.dbEngine
        .getUsers()
        .then((data) => {
          this.sendResponse(HTTP_STATUS.OK, JSON.stringify(data), res);
        })
        .catch((err) => console.log(err));
    } else if (!validate(id)) {
      this.sendResponse(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MSG.INVALID_USER_ID,
        res,
      );
    } else {
      this.dbEngine
        .getUserById(id)
        .then((data) => {
          this.sendResponse(HTTP_STATUS.OK, JSON.stringify(data), res);
        })
        .catch((err) => {
          console.log(err.message);
          this.sendResponse(
            HTTP_STATUS.NOT_FOUND,
            ERROR_MSG.USER_NOT_FOUND,
            res,
          );
        });
    }
  }

  public async post(req: IncomingMessage, res: ServerResponse) {
    const body = await parseReq(req);
    const userId = v4();
    const user = { id: userId, ...body };
    this.dbEngine
      .addUser(user)
      .then(() => {
        this.sendResponse(HTTP_STATUS.CREATED, JSON.stringify(user), res);
      })
      .catch((err) => {
        console.log(err.message);
        this.sendResponse(HTTP_STATUS.BAD_REQUEST, ERROR_MSG.LOGIN_USED, res);
      });
  }

  public async put(req: IncomingMessage, res: ServerResponse) {
    console.log(req, res);
    throw new Error('need implement');
  }

  public async delete(req: IncomingMessage, res: ServerResponse) {
    console.log(req, res);
    throw new Error('need implement');
  }

  public wrongRoute(_: IncomingMessage, res: ServerResponse) {
    this.sendResponse(HTTP_STATUS.NOT_FOUND, ERROR_MSG.INVALID_ROUTE, res);
  }
  public wrongUrl(_: IncomingMessage, res: ServerResponse) {
    this.sendResponse(HTTP_STATUS.NOT_FOUND, ERROR_MSG.INVALID_URL, res);
  }

  private sendResponse(code: number, message: string, res: ServerResponse) {
    res.statusCode = code;
    res.write(message);
    res.end();
  }
}
