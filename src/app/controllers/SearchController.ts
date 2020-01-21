import { Router, Response, Request } from 'express';

import IController from '../../app/interfaces/IController';
import IUserService from '../../domain/interfaces/services/IUserService';
import UserService from '../../domain/services/UserService';
import UserRepository from '../../infra/data/mongo/repositories/UserRepository';

import Location from '../../domain/entities/Location';

class SearchController implements IController {
  public path: string = '/search';
  public router: Router = Router();

  private _userService: IUserService;

  constructor() {
    this._userService = new UserService(new UserRepository());
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.search.bind(this));
  }

  private error(statusCode: number, error: string, res: Response): void {
    res.status(statusCode).json({
      success: false,
      message: error,
    });
  }

  private async search(req: Request, res: Response): Promise<void> {
    if (!req.query.latitude || !req.query.longitude || !req.query.techs) {
      this.error(
        422,
        'Missing parameters... verify: latitude, longitude, techs',
        res,
      );
    }

    const { latitude, longitude, techs } = req.query;
    const arrTechs = techs.split(',').map((item: string) => item.trim());
    const location: Location = new Location();
    location.latitude = latitude;
    location.longitude = longitude;

    const users = await this._userService.search(arrTechs, location);

    res.json({ users, arrTechs });
  }
}

export default SearchController;
