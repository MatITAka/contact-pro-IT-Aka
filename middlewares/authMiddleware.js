const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.cookies.authToken; // Récupère le token depuis le cookie

    if (!token) {
        return res.redirect('/auth/login'); // Redirige vers la page de connexion si le token est invalide
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decodedToken.userId }; // Ajoute l'ID utilisateur à req.user
        next();
    } catch (e) {
        return res.redirect('/auth/login'); // Redirige vers la page de connexion si le token est invalide
    }
}

module.exports = verifyToken;