import { IncomingMessage, ServerResponse } from 'http';
import Controller from '../controller/controller';
import { HTTP_METHODS } from '../types/constants';

export default class Router {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }
  public async exec(req: IncomingMessage, res: ServerResponse) {
    console.log(`RequestURL: ${req.url} method: HTTP_${req.method}`);
    if (req.url && req.method) {
      switch (req.url) {
        case '/api/users':
          switch (req.method) {
            case HTTP_METHODS.GET:
              await this.controller.get(req, res);
              break;
            case HTTP_METHODS.POST:
              await this.controller.post(req, res);
              break;
            case HTTP_METHODS.PUT:
              await this.controller.put(req, res);
              break;
            case HTTP_METHODS.DELETE:
              await this.controller.delete(req, res);
              break;

            default:
              this.controller.wrongRoute(req, res);
              break;
          }
          break;

        default:
          this.controller.wrongRoute(req, res);
          break;
      }
    }
  }
}
