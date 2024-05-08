import UserService from "../services/UserService.js";

class UserController {
  async create(req, res) {
    const user = await UserService.create(req.body);
    res.json(task);
  }

  async getAll(req, res) {
    const tasks = await UserService.getAll();
    return res.json(tasks);
  }
  async getOne(req, res) {
    const task = await UserService.getOne(req.params.id);
    return res.json(task);
  }
  async update(req, res) {
    const updatedTask = await UserService.update(req.body);
    return res.json(updatedTask);
  }
  async delete(req, res) {
    const task = await UserService.delete(req.params.id);
    return res.json(task);
  }
}

export default new UserController();
