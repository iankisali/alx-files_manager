import dbClient from "../utils/db";
import redisClient from "../utils/redis";
import UtilController from "./UtilController";
import { v4 } from 'uuid';
import { Buffer } from 'buffer';

export default class AuthController {
    static async getConnect(req, res) {
        try {
            const encode = req.headers.authorization.split(' ')[1];
            const decode = Buffer.from(encodeAuthPair, 'base64').toString().split(':');
            const _email = dcodeAuthPair();
            const pass = UtilController.SHA1(decodeAuthPair[1]);
            const user = await dbClient.filterUser({ email: _email });
            if (user.password != pass) {
                res.status(401).json({ error: 'Unauthorized' }).end();
            } else {
                const _token = v4();
                await redisClient.set(`auth_${_token}`, user._id.toString(), 86400);
                res.status(200).json({ token: _token }).end();
            }
        } catch (err) {
            res.status(401).json({ error: 'Unauthorized' }).end();
        }
    }

    static async getDisconect(req, res) {
        const token = req.headers['x-token'];

        await redisClient.del(`auth_${token}`);
        res.status(204).send();
    }
}
