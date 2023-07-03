import { IncomingMessage } from 'http';
import User from '../types/user';

export default function parseReq(req: IncomingMessage): Promise<User> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let body: User = {
      username: '',
      age: 0,
      hobbies: [],
    };
    req.on('data', (chunk: Buffer) => {
      if (chunk) {
        chunks.push(chunk);
      }
    });

    req.on('end', () => {
      body = JSON.parse(Buffer.concat(chunks).toString());
      resolve(body);
    });

    req.on('error', err => {
      console.log(err.message);
      reject(err.message);
    });
  });
}
