export default (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
        }
        res.status(204).json();
    });
};