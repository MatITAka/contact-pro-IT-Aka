const groupApiService = require('../services/groupApiService');

// récupére la liste des groupes
module.exports.getGroups = async (req, res) => {
    try {
        const groups = await groupApiService.getGroups();
        res.render("group/list", { groups }); // Rend la vue avec les données des groupes
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// récupère un groupe suivant son id
module.exports.getGroup = async (req, res) => {
    try {
        const group = await groupApiService.getGroup({ _id: req.params.id });
        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé' });
        }
        res.render("group/show", { group }); // Passe l'objet groupe à la vue
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// crée un groupe
module.exports.createGroup = async (req, res) => {
    try {
        const groupData = req.body;

        // Enregistre le groupe via le service
        const newGroup = await groupApiService.createGroup(groupData);
        if (!newGroup) {
            return res.status(400).json({ message: 'Erreur lors de la création du groupe' });
        }
        // Si le groupe est créé avec succès, redirige vers la liste des groupes
        res.redirect("/api/group/list");
    } catch (error) {
        console.error("Erreur lors de la création du groupe:", error);
        res.status(500).json({
            message: "Erreur lors de la sauvegarde du groupe",
            error: error.message
        });
    }
};

// update un groupe
module.exports.updateGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const groupData = req.body;

        // Met à jour le groupe via le service
        const updatedGroup = await groupApiService.updateGroup(groupId, groupData);
        if (!updatedGroup) {
            return res.status(404).json({ message: 'Groupe non trouvé' });
        }
        res.redirect("/api/group/list"); // Redirige vers la liste des groupes après la mise à jour
    } catch (error) {
        console.error("Erreur lors de la mise à jour du groupe:", error);
        res.status(500).json({
            message: "Erreur lors de la mise à jour du groupe",
            error: error.message
        });
    }
};

// supprime un groupe
module.exports.deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.id;

        // Supprime le groupe via le service
        const deletedGroup = await groupApiService.deleteGroup(groupId);
        if (!deletedGroup) {
            return res.status(404).json({ message: 'Groupe non trouvé' });
        }
        res.redirect("/api/group/list"); // Redirige vers la liste des groupes après la suppression
    } catch (error) {
        console.error("Erreur lors de la suppression du groupe:", error);
        res.status(500).json({
            message: "Erreur lors de la suppression du groupe",
            error: error.message
        });
    }
};