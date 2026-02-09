// const subscriptionRepository = require("../../models/sequelize/subscription/subscription.repository");
const subscriptionRepository = require("../../models/mongoDb/subscription/subscription.repository");

async function httpCreateSubscription(req, res) {
    try {
        const data = await subscriptionRepository.create(req.body);
        res.status(201).json({ ...data, created: "ok" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpGetSingleSubscription(req, res) {
    try {
        const data = await subscriptionRepository.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpGetAllSubscriptions(req, res) {
    try {
        const data = await subscriptionRepository.getAll(req.query);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpUpdateSubscription(req, res) {
    try {
        await subscriptionRepository.update(req.params.id, req.body);
        const data = await subscriptionRepository.findById(req.params.id);
        res.status(200).json({ ...data, updated: "ok" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpDeleteSubscription(req, res) {
    try {
        await subscriptionRepository.delete(req.params.id);
        res.status(200).json({ deleted: "ok" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    httpCreateSubscription,
    httpGetAllSubscriptions,
    httpGetSingleSubscription,
    httpUpdateSubscription,
    httpDeleteSubscription,
};
