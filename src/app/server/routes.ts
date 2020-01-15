import { Router, Request, Response } from 'express';

const routes: Router = Router();

routes.get('/test', (_: Request, res: Response) => {
  res.json('ok, running...');
});

export default routes;
