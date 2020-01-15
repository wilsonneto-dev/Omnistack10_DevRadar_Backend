import Server from './server';
import DevController from './controllers/DevsController';

const server = new Server([
  new DevController()
]);

server.startup();
