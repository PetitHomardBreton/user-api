import query from '../database.js';
import xss from 'xss';

export default (req, res) => {
    query(
        'SELECT pseudo FROM User',
        (error, result) => {
            if(error) {
                console.error(error);
                res.status(500).json({
                    error: 'Erreur server'
                });
                return;
            }
            
            res.status(200).json({
                data: result
            });
        }
    );
}
