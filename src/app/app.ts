import http from 'http';
import Router from '../router/router';
import { ERROR_MSG, HTTP_STATUS } from '../types/constants';

export default class Server {
  private server: http.Server;
  private router: Router;

  constructor() {
    this.router = new Router();
    this.server = http.createServer((req, res) => {
      try {
        this.router.exec(req, res);
      } catch (err) {
        res.statusCode = HTTP_STATUS.SERVER_ERROR;
        res.write(ERROR_MSG.SERVER_ERROR);
        res.end();
        console.log((err as Error).message);
      }
    });
  }

  start(port: string) {
    this.server.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
    this.server.on('error', (err) => console.log(err.message));
  }
}
