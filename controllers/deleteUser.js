import query from '../database.js';

export default (req, res) => {
    /* Récupération de l'id du user à supprimer */
    const id = req.params.id;
    /* On récupère le user à supprimer depuis la BDD */
    query(
        'SELECT id, role FROM User WHERE id = ?',
        [id],
        (error, results) => {
            /* On vérifie s'il y a une erreur lors l'exécution de la requête */
            if (error) {
                console.error(error);
                res.status(500).json({
                    error: 'Erreur serveur'
                });
                return;
            }
            /* Si le user n'a pas été trouvé, on répond not found au client */
            if (results.length === 0) {
                    return res.status(404).send({
                        error: `L'utilisateur avec l'id ${id} n' pas été trouvé`
                    });
                }
            /* On supprime le user dans la BDD */
            query(
                    'DELETE FROM User WHERE id = ?',
                    [id],
                    (error) => {
                        /* On vérifie s'il y a une erreur lors l'exécution de la requête */
                        if (error) {
                            console.error(error);
                            res.status(500).json({
                                error: 'Erreur serveur'
                            });
                            return;
                        }
                        /* On répond au client avec l'ID du user supprimé */
                    res.json({
                        data: { id: results[0].id }
                        });
                    }
                )
        }
    )
}

