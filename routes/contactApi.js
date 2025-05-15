const express = require("express");
const router = express.Router();
const contactApiController = require("../controller/contactApiController");
const Group = require('../models/group');
const {getContact} = require("../services/contactApiService");

/**
 * @swagger
 * tags:
 *  - name: Contact
 *    description: Gestion des contacts
 */


/**
 * @swagger
 * /api/contact/list:
 *   get:
 *     summary: Récupère la liste des contacts
 *     tags:
 *       - Contact
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   company:
 *                     type: string
 *                   adress:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 */
router.get("/list", contactApiController.getContacts);

/**
 * @swagger
 * /contact/list/{id}:
 *   get:
 *     summary: Récupère un contact par son ID
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du contact à récupérer
 *     responses:
 *       200:
 *         description: Détails du contact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 company:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *       404:
 *         description: Contact non trouvé
 */
router.get("/list/:id", contactApiController.getContact);

/**
 * @swagger
 * /contact/create:
 *   post:
 *     summary: Crée un nouveau contact
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               company:
 *                 type: string
 *                 example: Acme Corp
 *               adress:
 *                 type: string
 *                 example: 123 Main St
 *               email:
 *                 type: string
 *                 example: mail@email.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               website:
 *                 type: string
 *                 example: www.example.com
 *               sector:
 *                 type: string
 *                 example: Technology
 *               user:
 *                 type: string
 *                 example: 6824601a9799591db8fc2eab
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.get("/create", async (req, res) => {
    try {
        const groups = await Group.find(); // Récupère tous les groupes
        res.render("contact/new", { groups }); // Passe les groupes à la vue
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des groupes");
    }
});
router.post("/create", contactApiController.createContact);

/**
 * @swagger
 * /contact/update/{id}:
 *   put:
 *     summary: Met à jour un contact existant
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du contact à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               company:
 *                 type: string
 *               adress:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               website:
 *                 type: string
 *               sector:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *       404:
 *         description: Contact non trouvé
 */
router.put("/update/:id", contactApiController.updateContact);
router.get("/update/:id", async (req, res) => {
    try {
        const contact = await getContact({ _id: req.params.id });
        if (!contact) {
            return res.status(404).send("Contact non trouvé");
        }
        const groups = await Group.find();
        res.render("contact/edit", { contact, groups });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération du contact");
    }
});
router.post("/update/:id", contactApiController.updateContact);

/**
 * @swagger
 * /api/contact/delete/{id}:
 *   delete:
 *     summary: Supprime un contact par son ID
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du contact à supprimer
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact non trouvé
 */
router.delete("/delete/:id", contactApiController.deleteContact);
router.post("/delete/:id", contactApiController.deleteContact);

module.exports = router;