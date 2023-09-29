import query from '../database.js';

export default (req, res) => {
    const id = req.params.id;

    query(
        'SELECT id, pseudo, role FROM User WHERE id = ?',
        [id],
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({
                    error: 'Erreur serveur'
                });
                return;
            }

            if (result.length === 0) {
                res.status(404).json({
                    error: 'User not found'
                });
                return;
            }

            res.status(200).json({
                data: result[0]
            });
        }
    );
};
