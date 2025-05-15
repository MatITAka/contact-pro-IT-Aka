const Group = require("../models/group");
const Contact = require("../models/contact");

// Récupère la liste des groupes
module.exports.getGroups = async () => {
    try {
        return await Group.find().populate('contacts', 'firstName lastName email');
    } catch (error) {
        throw Error('Error while querying all Groups: ' + error.message);
    }
};

// Récupère un groupe suivant son id
module.exports.getGroup = async (query) => {
    try {
        return await Group.findOne(query).populate('contacts', 'firstName lastName email');
    } catch (error) {
        throw Error('Error while querying one Group: ' + error.message);
    }
};

// Crée un groupe
module.exports.createGroup = async (groupData) => {
    try {
        // Crée une instance du modèle Group
        const group = new Group(groupData);
        const savedGroup = await group.save();
        return savedGroup;
    } catch (error) {
        throw Error("Error while saving Group: " + error.message);
    }
};

// Met à jour un groupe
module.exports.updateGroup = async (groupId, groupData) => {
    try {
        return await Group.findByIdAndUpdate(groupId, groupData, { new: true });
    } catch (error) {
        throw Error('Error while updating Group: ' + error.message);
    }
};

// Supprime un groupe
module.exports.deleteGroup = async (groupId) => {
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return { error: true, message: "Group not found" };
        }

        // Supprime le groupe
        await Group.deleteOne({ _id: groupId });
        return group;
    } catch (error) {
        throw Error('Error while deleting Group: ' + error.message);
    }
};