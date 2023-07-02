import http from 'http';

export default class Server {
  private port: number;

  constructor(port: number) {
    this.port = port;
  }

  start() {
    const server = http.createServer((async (req, res) => {
      console.log(req);
      res.end();
    }) as http.RequestListener);

    server.listen(this.port, 'localhost', () => {
      console.log(`Server running at http://localhost:${this.port}/`);
    });

    server.on('error', (err) => console.log(err.message));
  }
}
