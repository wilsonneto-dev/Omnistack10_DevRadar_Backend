import express from 'express';
import cors from 'cors';

// import routes from './routes';
import IController from 'app/interfaces/IController';

import '../config/dotenv';

import db from '../../infra/data/mongo/db';

class Server {
  private app: express.Express;
  private controllers: Array<IController>;

  constructor(pControllers: Array<IController>) {
    this.controllers = pControllers;
    this.app = express();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    // this.app.use(routes);

    this.controllers.forEach((controller: IController) => {
      this.app.use(controller.router);
    });
  }

  private database(): void {
    db.setup(process.env.DB_CONNECTION || '');
  }

  public startup(): void {
    this.middlewares();
    this.database();
    this.routes();

    const port: number = parseInt(process.env.PORT || '', 10) || 3333;
    this.app.listen(port, () => {
      console.log(`running on port ${port}...`);
    });
  }
}

export default Server;
