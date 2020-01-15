import { IRouter } from 'express';

interface IController {
  path: string;
  router: IRouter;
}

export default IController;