import query from '../database.js';
import bcrypt from 'bcrypt';

export default (req, res) => {
    const {pseudo, password} = req.body;
    
    // Récupération du User par son pseudo
    query(
        'SELECT * FROM User WHERE pseudo = ?',
        [pseudo],
        (error, results) => {
            // Gestion de l'erreur
            if (error) {
                console.error(`Erreur lors l'exécution de la requête : ${error}`);
                res.status(500).json({
                  error: 'Erreur serveur'
                });
                return;
            }

            // Si le user n'a pas été trouvé, on répond au client
            if (results.length === 0) {
                return res.status(400).json({
                  error: `Identifiants incorrects`
                });
            }
            
            bcrypt.compare(password, results[0].password, (error, isAllowed) => {
                // Gestion de l'erreur
                if (error) {
                    console.error(`Erreur de hash: ${error}`);
                    res.status(500).json({
                      error: 'Erreur serveur'
                    });
                    return;
                }
                
                if(isAllowed) {
                    req.session.role = results[0].role;
                    return res.json({
                        data: {
                            id: results[0].id,
                            pseudo: results[0].pseudo,
                            role: results[0].role
                        }
                    })
                }
                
                return res.status(400).json({
                  error: `Identifiants incorrects`
                });
            })
        }
    )
}