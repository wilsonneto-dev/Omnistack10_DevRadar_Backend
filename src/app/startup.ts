import Server from './server';

import DevController from './controllers/DevsController';
import SearchController from './controllers/SearchController';

const server = new Server([new DevController(), new SearchController()]);

server.startup();
