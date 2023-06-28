import { Router } from 'express';

import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = Router();

router.use((req, res, next) => {
  const path = ['/connect'];
  if (!path.includes(req.path)) {
    next();
  } else if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' }).end();
  } else {
    next();
  }
});

router.use((req, res, next) => {
  const path = ['disconnect', '/users/me', '/files'];
  if (!path.includes(req.path)) {
    next();
  } else if (!req.headers['x-token']) {
    res.status(401).json({ error: 'Unauthorized' }).end();
  } else {
    next();
  }
});

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

module.exports = router;
