import UtilController from './UtilController';
import dbClient from '../utils/db';

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: `Missing ${!email ? 'email' : 'password'}` }).end();
    } else if (await dbClient.userExists(email)) {
      res.status(400).json({ error: 'Already exist' }).end();
    } else {
      try {
        const hash = UtilController.SHA1(password);
        const insert = await dbClient.newUser(email, hash);
        const { _id } = insert.ops[0];
        const _email = insert.ops[0].email;
        res.status(201).json({ id: _id, email: _email }).end();
      } catch (err) {
        res.status(400).json({ error: err.message }).end();
      }
    }
  }

  static async getMe(req, res) {
    const { user } = req;
    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
