const express = require('express');
const router = express.Router();
const groupApiController = require('../controller/groupApiController');
const {getGroup} = require("../services/groupApiService");

/**
 * @swagger
 * tags:
 *  - name: Group
 *    description: Gestion des groupes
 */

/**
 * @swagger
 * /group/list:
 *   get:
 *     summary: Récupère la liste des groupes
 *     tags:
 *       - Group
 *     responses:
 *       200:
 *         description: Liste des groupes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   creationDate:
 *                     type: string
 *                     format: date-time
 *                   contacts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         email:
 *                           type: string
 */
router.get('/list', groupApiController.getGroups);

/**
 * @swagger
 * /group/{id}:
 *   get:
 *     summary: Récupère un groupe par son ID
 *     tags:
 *       - Group
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du groupe à récupérer
 *     responses:
 *       200:
 *         description: Groupe récupéré avec succès
 *       404:
 *         description: Groupe non trouvé
 */
router.get('/list/:id', groupApiController.getGroup);

/**
 * @swagger
 * /group/create:
 *   post:
 *     summary: Crée un nouveau groupe
 *     tags:
 *       - Group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Groupe A
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: 64b7f3e2c9a1f2a1b8e4d123
 *     responses:
 *       201:
 *         description: Groupe créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/create', groupApiController.createGroup);
router.get('/create', (req, res) => {
    res.render("group/new");
});

/**
 * @swagger
 * /group/update/{id}:
 *   put:
 *     summary: Met à jour un groupe existant
 *     tags:
 *       - Group
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du groupe à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Groupe mis à jour avec succès
 *       404:
 *         description: Groupe non trouvé
 */
router.post('/update/:id', groupApiController.updateGroup);
router.get('/update/:id', async (req, res) => {
    try {
        const group = await getGroup({_id:req.params.id});
        if (!group) {
            return res.status(404).send("Groupe non trouvé");
        }
        res.render("group/edit", {group});
    }
    catch (error) {
        res.status(500).send("Erreur lors de la récupération du groupe");
    }
});
router.put('/update/:id', groupApiController.updateGroup);


/**
 * @swagger
 * /group/delete/{id}:
 *   delete:
 *     summary: Supprime un groupe par son ID
 *     tags:
 *       - Group
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du groupe à supprimer
 *     responses:
 *       200:
 *         description: Groupe supprimé avec succès
 *       404:
 *         description: Groupe non trouvé
 */
router.delete('/delete/:id', groupApiController.deleteGroup);
router.post('/delete/:id', groupApiController.deleteGroup);

module.exports = router;