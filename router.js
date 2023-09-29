import express from "express";

const router = express.Router();

import HomeController from "./controllers/home.js";
import createUser from "./controllers/createUser.js";
import detailsUser from "./controllers/detailsUser.js";
import deleteUser from "./controllers/deleteUser.js";
import updateUser from "./controllers/updateUser.js";

import { login } from './controllers/login.js';

// Route pour la page d'accueil
router.get('/', HomeController); 

/**************************************************
 * ROUTES pour l'authentification
 * ***********************************************/
router.post("/login", login);

/**************************************************
 * ROUTES du CRUD
 **************************************************/

// C: Route pour créer un user (post / users)
router.post('/users', createUser); 

// R: Route pour récupérer le détail d'un user (get / users /: id)
router.get('/users/:id', detailsUser);

// U: Route pour modifier un user (put / users /: id)
router.put('/users/:id', updateUser); 

// D: Route pour supprimer un user (delete / users /: id)
router.delete('/users/:id', deleteUser);



export default router;
