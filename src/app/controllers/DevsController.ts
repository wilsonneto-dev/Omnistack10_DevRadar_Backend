import { Router, Request, Response } from 'express';
import IController from '../interfaces/IController';

import axios, { AxiosResponse } from 'axios';

import User from '../../domain/entities/User';
import IUserService from '../../domain/interfaces/services/IUserService';

// que seriam por injeção de dependencia
import UserService from '../../domain/services/UserService';
import UserRepository from '../../infra/data/mongo/repositories/UserRepository';

class DevsController implements IController {
  public path: string = '/devs';
  public router: Router = Router();

  private _userService: IUserService;

  constructor() {
    this._userService = new UserService(new UserRepository());
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, this.store.bind(this));
    this.router.get(`${this.path}/:id`, this.getById.bind(this));
  }

  private error(statusCode: number, error: string, res: Response): void {
    res.status(statusCode).json({
      success: false,
      message: error,
    });
  }

  private async store(req: Request, res: Response): Promise<void> {
    const github_username: string = req.body?.github_username;
    const techs: string = req.body?.techs;

    if (!github_username || !techs)
      return this.error(422, 'Invalid entries', res);

    const githubResponse: AxiosResponse = await axios
      .create({
        validateStatus: function() {
          return true;
        },
      })
      .get(`https://api.github.com/users/${github_username}`);

    if (githubResponse.status !== 200)
      return this.error(400, `github: ${githubResponse.data.message}`, res);

    const { data } = githubResponse;

    const user = new User();
    user.avatar_url = data.avatar_url;
    user.bio = data.bio;
    user.github_name = github_username;
    user.name = data.name || data.github_username;
    user.techs = techs.split(',').map((tech: string) => tech.trim());

    const ok = await this._userService.store(user);

    res.status(200).json(ok);
  }

  private async getById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params?.id;
      if (!id) this.error(422, 'Invalid entries', res);

      const user = await this._userService.getById(id);
      res.json(user);
    } catch (err) {
      res.status(422).json(err);
    }
  }
}

export default DevsController;
