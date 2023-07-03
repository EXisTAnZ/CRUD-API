import http from 'http';
import Router from '../router/router';

export default class Server {
  private server: http.Server;
  private router: Router;

  constructor() {
    this.router = new Router();
    this.server = http.createServer((req, res) => {
      this.router.exec(req, res);
    });
  }

  start(port: string) {
    this.server.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
    this.server.on('error', err => console.log(err.message));
  }
}
