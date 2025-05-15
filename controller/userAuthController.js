const userAuthService = require("../services/userAuthService");
const UserAuth = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let userAuth = await userAuthService.getUser({ email: email });
        if (!userAuth) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, userAuth.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // crée et retourne le token
        const token = jwt.sign({ userId: userAuth._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION});

        // Définit le token dans un cookie HTTP sécurisé
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Activez uniquement en production
            maxAge: 24 * 60 * 60 * 1000 // 1 jour
        });

        // Redirige vers la liste des utilisateurs
        return res.redirect('/api/contact/list');
    }
    catch (e) {
        return res.status(400).json({status: 400, message: e.message });
    }
}

module.exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let userAuth = await userAuthService.getUser({ email: email });
        if (userAuth) {
            return res.status(409).json({ error: 'This email address is already used' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const creationDate = new Date();
        userAuth = new UserAuth({ firstName, lastName, creationDate, email, password: hashedPassword });
        await userAuth.save();
        return res.status(201).json({ message: 'User created successfully' });
    }
    catch (e) {
        return res.status(400).json({status: 400, message: e.message });
    }
}