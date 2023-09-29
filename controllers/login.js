import query from '../database.js';
import bcrypt from 'bcrypt';

export function login(req, res) {
    const { pseudo, password } = req.body;

    // Récupération du User par son pseudo
    query(
        'SELECT * FROM User WHERE pseudo = ?',
        [pseudo],
        (error, result) => {
            // Gestion de l'erreur
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête : ${error}`);
                res.status(500).json({ error: 'Erreur serveur' });
                return;
            }

            // Si l'utilisateur n'a pas été trouvé
            if (result.length === 0) {
                return res.status(400).json({ error: 'Identifiants incorrects' });
            }

            // Vérification du mot de passe
            bcrypt.compare(password, result[0].password, (error, isAllowed) => {
                // Gestion de l'erreur
                if (error) {
                    console.error(`Erreur de hash: ${error}`);
                    res.status(500).json({
                      error: 'Erreur serveur'
                    });
                    return;
                }
                
                if (isAllowed) {
                    req.session.role = result[0].role;
                    return res.json({
                        data: {
                            id: result[0].id,
                            pseudo: result[0].pseudo,
                            role: result[0].role
                        }
                    });
                }
                
                return res.status(400).json({
                  error: `Identifiants incorrects`
                });
            });
        }
    );
}
