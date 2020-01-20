import { Router, Request, Response } from 'express';
import IController from '../interfaces/IController';

import axios, { AxiosResponse } from 'axios';

import User from '../../domain/entities/User';
import Location from '../../domain/entities/Location';

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
    this.router.get(`${this.path}/u/:username`, this.getByUser.bind(this));
    this.router.get(this.path, this.getAll.bind(this));
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
    const longitude: number = req.body?.longitude;
    const latitude: number = req.body?.latitude;

    if (!github_username || !techs || !latitude || !longitude)
      return this.error(422, 'Invalid entries', res);

    const userVerify: User | null = await this._userService.getByUser(
      github_username,
    );

    if (userVerify) {
      return this.error(
        409,
        `User ${github_username} already registered...`,
        res,
      );
    }

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

    user.location = new Location();
    user.location.latitude = latitude;
    user.location.longitude = longitude;

    const registeredUser = await this._userService.store(user);

    res.status(200).json(registeredUser);
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

  private async getByUser(req: Request, res: Response): Promise<void> {
    try {
      const username: string = req.params.username || '';
      if (!username || username.trim() == '') {
        this.error(422, 'Username parameter is required', res);
      }

      const user: User | null = await this._userService.getByUser(username);
      if (!user) {
        res.status(404).json({ success: true, message: 'no results' });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(422).json(err);
    }
  }

  private async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const list = await this._userService.getAll();
      res.json(list);
    } catch (err) {
      res.status(422).json(err);
    }
  }
}

export default DevsController;
