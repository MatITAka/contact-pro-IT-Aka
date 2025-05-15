const express = require("express");
const router = express.Router();
const userAuthController =
    require("../controller/userAuthController");
/**
 * @swagger
 * tags:
 *   - name: Authentification
 *     description: Gestion des authentifications
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Enregistre un nouvel utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Mat"
 *               lastName:
 *                 type: string
 *                 example: "Dupont"
 *               email:
 *                 type: string
 *                 example: "test@email.com"
 *               password:
 *                 type: string
 *                 example: "MotDePasse123"
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/register", userAuthController.register);

router.get("/register", (req, res) => {
    res.render("auth/register");
}
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@email.com"
 *               password:
 *                 type: string
 *                 example: "azerty"
 *     responses:
 *       200:
 *         description: Authentification réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", userAuthController.login);

router.get("/login", (req, res) => {
    res.render("auth/login");
}
);

module.exports = router;