import http from 'http';

export default class Server {
  private server: http.Server;

  constructor() {
    this.server = http.createServer();
  }

  start(port: string) {
    this.server.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
    this.server.on('error', err => console.log(err.message));
  }
}
