import Server from './app/app';
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;
const server = new Server();
server.start(PORT || '3000');
