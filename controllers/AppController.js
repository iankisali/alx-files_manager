import { redisClient } from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus(req, res) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();
    res.set('Content-Type', 'application/json');
    res.status(200).json({ redis: redisStatus, db: dbStatus }).end();
  }

  static async getStats(req, res) {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();
    res.set('Content-Type', 'application/json');
    res.status(200).json({ numUsers, numFiles }).end();
  }
}

export default AppController;
