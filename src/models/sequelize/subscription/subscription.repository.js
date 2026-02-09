const RepositoryBase = require("../RepositoryBase");
const Subscription = require("./subscription.model");

class SubscriptionRepository extends RepositoryBase {
    constructor(model){
        super(model)
    }
}

module.exports = new SubscriptionRepository(Subscription)