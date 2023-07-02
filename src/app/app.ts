import http from 'http';
import dotenv from 'dotenv';

export default class Server {
  private port: number;

  constructor() {
    dotenv.config();
    this.port = parseInt(process.env['PORT'] || '3000');
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
