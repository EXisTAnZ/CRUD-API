import { IncomingMessage } from 'http';
import User from '../types/user';

export default async function parseReq(req: IncomingMessage) {
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
  });
  return body;
}
