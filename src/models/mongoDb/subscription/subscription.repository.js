const Event = require("../event/event.model");
const RepositoryBaseMongo = require("../RepositoryBaseMongo");
const User = require("../user/user.model");
const Subscription = require("./subscription.model");

class SubscriptionRepository extends RepositoryBaseMongo {
    constructor(model) {
        super(model);
    }

    async create(data) {
        try {
            // Créer la subscription
            const subscription = await this.model.create(data);
            
            // Ajouter la subscription à la liste des subscriptions de l'utilisateur
            await User.findByIdAndUpdate(
                data.user_id,
                { $push: { subscriptions: subscription._id } },
                { new: true }
            );
            
            // Ajouter l'utilisateur à la liste des subscribers de l'événement
            await Event.findByIdAndUpdate(
                data.event_id,
                { $push: { subscribers: subscription._id } },
                { new: true }
            );
            
            return subscription;
        } catch (err) {
            throw new Error(err);
        }
    }

    async delete(id) {
        try {
            // Récupérer la subscription avant de la supprimer
            const subscription = await this.model.findById(id);
            
            if (!subscription) {
                throw new Error("Subscription not found");
            }
            
            // Supprimer la subscription de la liste des subscriptions de l'utilisateur
            await User.findByIdAndUpdate(
                subscription.user_id,
                { $pull: { subscriptions: subscription._id } },
                { new: true }
            );
            
            // Supprimer l'utilisateur de la liste des subscribers de l'événement
            await Event.findByIdAndUpdate(
                subscription.event_id,
                { $pull: { subscribers: subscription.user_id } },
                { new: true }
            );
            
            // Supprimer la subscription
            return await this.model.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new SubscriptionRepository(Subscription);
