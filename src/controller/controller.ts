import { IncomingMessage, ServerResponse } from 'http';
import DBEngine from '../db/engine';
import uuid from 'uuid';
import parseReq from './utils';
import { ERROR_MSG } from '../types/constants';

export default class Controller {
  private dbEngine: DBEngine;

  constructor() {
    this.dbEngine = new DBEngine();
  }

  public async get(_: IncomingMessage, res: ServerResponse, id?: string) {
    if (!id) {
      this.dbEngine
        .getUsers()
        .then(data => {
          res.statusCode = 200;
          res.write(JSON.stringify(data));
        })
        .catch(err => console.log(err));
    } else if (!uuid.validate(id)) {
      res.statusCode = 400;
      res.write(ERROR_MSG.INVALID_USER_ID);
    } else {
      this.dbEngine
        .getUserById(id)
        .then(data => {
          res.statusCode = 200;
          res.write(JSON.stringify(data));
        })
        .catch(err => console.log(err));
    }
  }

  public async post(req: IncomingMessage, res: ServerResponse) {
    const body = await parseReq(req);
    const userId = uuid.v4();
    const user = { userId, ...body };
    this.dbEngine
      .addUser(user)
      .then(() => {
        res.statusCode = 201;
        res.write(JSON.stringify(user));
      })
      .catch(err => {
        console.log(err);
        res.statusCode = 400;
        res.write(err.message);
      });
  }
  public wrongRoute(_: IncomingMessage, res: ServerResponse) {
    res.statusCode = 404;
    res.end(ERROR_MSG.INVALID_ROUTE);
  }
}
