import express from "express";

const router = express.Router();

import HomeController from "./controllers/home.js";
import createUser from "./controllers/createUser.js";
import usersList from "./controllers/usersList.js";

router.get('/', HomeController);
router.post('/users', createUser);

export default router;
