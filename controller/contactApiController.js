const contactApiServices = require('../services/contactApiService');
const Contact = require('../models/contact');

// récupére la liste des contacts
module.exports.getContacts = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null; // Vérifie si req.user existe
        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }
        const contacts = await contactApiServices.getContacts(userId);
        res.render("contact/list", { contacts }); // Rend la vue avec les données des contacts
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// récupère un contact suivant son id
module.exports.getContact = async (req, res) => {
    try {
        const contact = await contactApiServices.getContact({ _id: req.params.id });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.render("contact/show", { contact }); // Passe l'objet contact à la vue
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// crée un contact
module.exports.createContact = async (req, res) => {
    try {
        // Récupère l'ID de l'utilisateur connecté
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        // Ajoute l'ID de l'utilisateur au corps de la requête
        const contactData = { ...req.body, user: userId };

        // Crée une instance du modèle Contact
        const contact = new Contact(contactData);
        contact.createdAt = new Date();

        // Enregistre le contact via le service
        const newContact = await contactApiServices.createContact(contact);
        res.redirect("/api/contact/list"); // Redirige vers la liste des contacts après la création
    } catch (error) {
        console.error("Erreur lors de la création du contact:", error);
        res.status(500).json({
            message: "Error while saving Contact",
            error: error.message
        });
    }
};

// update un contact
module.exports.updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const contactData = { ...req.body };

        // Met à jour le contact avec le groupe sélectionné
        const updatedContact = await Contact.findByIdAndUpdate(contactId, contactData, { new: true });
        if (!updatedContact) {
            return res.status(404).send("Contact non trouvé");
        }

        res.redirect("/api/contact/list");
    } catch (error) {
        res.status(500).send("Erreur lors de la mise à jour du contact");
    }
};

// supprime un contact
module.exports.deleteContact = async (req, res) => {
    console.log('Received method:', req.method); // Should log DELETE
    try {
        const deletedContact = await contactApiServices.deleteContact({ _id: req.params.id });
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }
        res.redirect("/api/contact/list"); // Redirige vers la liste après la suppression
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
