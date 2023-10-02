import express from "express";

const router = express.Router();

import HomeController from "./controllers/home.js";
import createUser from './controllers/createUser.js';
import updateUser from './controllers/updateUser.js';
import login from './controllers/login.js';
import logout from './controllers/logout.js';

const checkAuthentication = (req, res, next) => {
    if(!req.session.role) {
      return res.status(401).send({
        error: `Accès non autorisé`
      });
    }
    next();
}

router.get('/', HomeController);
router.post('/users', checkAuthentication, createUser);
/*
curl --location --request PUT 'http://najs05.sites.3wa.io:9001/users/0135ee2e-a2bc-4abc-b706-710e48977d14' \
--header 'Content-Type: application/json' \
--data '{
    "pseudo": "bobo"
}'
*/
router.put('/users/:id', checkAuthentication, updateUser);

// Route pour récupérer le détail d'un user

// Route pour supprimer un user

router.post('/login', login);
router.get('/logout', logout);

export default router;
