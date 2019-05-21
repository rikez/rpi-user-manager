'use strict';

/**
 * HTTP Handler for the raspberry users.
 * @class UserController
 */
class UserController {
  /**
   * Creates an instance of UserController.
   * @param {} repository
   * @memberof UserController
   */
  constructor(repository) {
    this._repository = repository;
  }

  /**
   * Creates a new user
   * @method POST
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   * @memberof UserController
   */
  async create(req, res, next) {
    try {
      const user = await this._repository.create(req.body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetch an user
   * @method GET
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   * @memberof UserController
   */
  async getById(req, res, next) {
    try {
      const user = await this._repository.getById(req.params.id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetch all users
   * @method GET
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   * @memberof UserController
   */
  async getAll(req, res, next) {
    try {
      const users = await this._repository.getAll();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetch all users
   * @method GET
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   * @memberof UserController
   */
  async update(req, res, next) {
    try {
      const updated = await this._repository.update(req.params.id, req.body);

      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;