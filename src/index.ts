import Server from './app/app';

const server = new Server();
server.start();

const sum = (a: number, b: number) => {
  return a + b;
};

export default sum;
