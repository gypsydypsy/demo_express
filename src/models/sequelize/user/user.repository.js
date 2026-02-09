const RepositoryBase = require("../RepositoryBase");
const User = require("./user.model");

class UserRepository extends RepositoryBase {
    constructor(model) {
        super(model);
    }

    async findByEmail(email) {
        try {
            return await User.findOne({ where: { email } });
        } catch (err) {
            throw new Error(err);
        }
    }

    async getSubscriptions(id) {
        try {
            return await User.findByPk(id, {
                include: ["subscriptions"],
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new UserRepository(User);
