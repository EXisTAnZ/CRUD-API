import { IncomingMessage, ServerResponse } from 'http';
import Controller from '../controller/controller';
import { HTTP_METHODS } from '../types/constants';
import { parseUrl } from '../controller/utils';

export default class Router {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }
  public async exec(req: IncomingMessage, res: ServerResponse) {
    const { url, method } = req;
    const { api, route, param } = parseUrl(url || '');
    console.log(api, route, param);
    console.log(`RequestURL: ${url} method: HTTP_${method}`);
    if (url && method && api === 'api') {
      switch (route) {
        case 'users':
          switch (method) {
            case HTTP_METHODS.GET:
              await this.controller.get(req, res, param);
              break;
            case HTTP_METHODS.POST:
              await this.controller.post(req, res);
              break;
            case HTTP_METHODS.PUT:
              await this.controller.put(req, res, param);
              break;
            case HTTP_METHODS.DELETE:
              await this.controller.delete(req, res, param);
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
    } else this.controller.wrongUrl(req, res);
  }
}
