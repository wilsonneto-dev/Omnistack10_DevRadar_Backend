import { Router, Request, Response } from 'express';

class DevsController {
  public path: string = '/devs';

  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getAll);
  }

  private async getAll(_req: Request, res: Response): Promise<void> {
    res.json("i'm running...");
  }
}

export default DevsController;
