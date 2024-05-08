class AuthController {
  async auth(req, res) {
    res.json(req);
  }
}

export default new AuthController();
