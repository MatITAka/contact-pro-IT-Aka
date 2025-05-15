const User = require("../models/user");


module.exports.getUser = async (query) => {
    try {
        let user = await User.findOne(query);
        if (!user) {
            return null;
        }
        return user;
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user from database" + error);
    }
}

module.exports.createUser = async (userData) => {
    try {
        return await User.create(userData);
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user in database" + error);
    }
}