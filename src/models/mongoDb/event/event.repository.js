const RepositoryBaseMongo = require("../RepositoryBaseMongo");
const Event = require("./event.model");

class EventRepository extends RepositoryBaseMongo {
    constructor(model) {
        super(model);
    }

    async getSubscribers(id) {
        try {
            return await Event.findById(id).populate({
                path: "subscribers",
                populate: { path: "user_id" },
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new EventRepository(Event);
