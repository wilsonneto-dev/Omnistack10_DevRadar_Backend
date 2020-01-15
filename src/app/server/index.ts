import express from 'express';
import cors from 'cors';

import routes from './routes';
import IController from 'app/interfaces/IController';

class Server {
  private app: express.Express;
  private controllers: [IController];

  constructor(pControllers: [IController]) {
    this.controllers = pControllers;
    this.app = express();
  }

  private middlewares(): void {
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use(routes);

    this.controllers.forEach((controller: IController) => {
      this.app.use(controller.router);
    });
  }

  public startup(): void {
    this.middlewares();
    this.routes();

    const port: number = parseInt(process.env.PORT || '', 10) || 3333;
    this.app.listen(port, () => {
      console.log(`running on port ${port}...`);
    });
  }
}

export default Server;
