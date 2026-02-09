const User = require("./user/user.model");
const Event = require("./event/event.model");
const Subscription = require("./subscription/subscription.model");

User.belongsToMany(Event, {
    through: Subscription,
    foreignKey: "user_id", 
    otherKey: "event_id",
    as: "subscriptions"
});

Event.belongsToMany(User, {
    through: Subscription,
    foreignKey: 'event_id', 
    otherKey: 'user_id', 
    as: 'subscribers'
});
