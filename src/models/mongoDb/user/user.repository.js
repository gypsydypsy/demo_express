const RepositoryBaseMongo = require("../RepositoryBaseMongo");
const User = require("./user.model");

class UserRepository extends RepositoryBaseMongo {
    constructor(model) {
        super(model);
    }

    async getSubscriptions(id) {
        try {
            return await User.findById(id).populate({
                path: "subscriptions",
                populate: { path: "event_id" },
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new UserRepository(User);
