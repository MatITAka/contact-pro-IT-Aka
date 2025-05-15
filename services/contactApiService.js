const Contact = require("../models/contact");
const User = require("../models/user");

// récupére la liste des contacts
module.exports.getContacts = async (userId) => {
    try {
        return await Contact.find({ user: userId }).populate('user', 'firstName lastName email')
            .populate('groups', 'name');
    } catch (error) {
        throw Error('Error while querying all Contacts: ' + error.message);
    }
};

// récupère un contact suivant son id
module.exports.getContact = async (query) => {
    try {
        return await Contact.findOne(query).populate('user', 'firstName lastName email').populate('groups', 'name');
    } catch (e) {
        throw Error('Error while querying one Contact' + e.message);
    }
};

//crée un contact
module.exports.createContact = async (contact) => {
    try {
        // Vérifie si l'utilisateur existe
        const user = await User.findById(contact.user);
        if (!user) {
            return { error: true, message: "User not found" };
        }
        // Sauvegarde le contact
        const savedContact = await contact.save();
        //Ajoute l'ID du contact au tableau des contacts de l'utilisateur
        user.contacts.push(savedContact._id);
        await user.save();
    }
    catch (error) {
        throw Error("Error while save Contact" + error.message);
    }
}

// met à jour un contact
module.exports.updateContact = async (query, contact) => {
    try {
        return await Contact.updateOne(query, contact);
    }
    catch (e) {
        throw Error('Error while update Contact');
    }
}

// supprime un contact
module.exports.deleteContact = async (query) => {
    try {
        // Trouve le contact à supprimer
        const contact = await Contact.findOne(query);
        if (!contact) {
            return { error: true, message: "Contact not found" };
        }

        // Supprime le contact
        await Contact.deleteOne({ _id: contact._id });

        // Retire l'ID du contact du tableau des contacts de l'utilisateur
        const user = await User.findById(contact.user);
        if (user) {
            user.contacts.pull(contact._id);
            await user.save();
        }

        return contact;
    }
    catch (e) {
        throw Error('Error while deleting contact: ' + e.message);
    }
};


