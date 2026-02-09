const RepositoryBase = require("../RepositoryBase");
const Event = require("./event.model");

class EventRepository extends RepositoryBase {
    constructor(model) {
        super(model);
    }

    async getSubscribers(id) {
        try {
            return await Event.findByPk(id, { include: ["subscribers"] });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new EventRepository(Event);
