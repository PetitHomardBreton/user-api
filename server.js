import dotenv from 'dotenv';
dotenv.config();
import session from 'express-session';

import express from 'express';
import router from './router.js';

const PORT = process.env.PORT;
const app = express();

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}));

//pour récupérer les informations du formulaire
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

//importation des routes
app.use('/', router);

// connexion du serveur au réseau
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
