const eventRepository = require("../../models/sequelize/event/event.repository");
// const eventRepository = require("../../models/mongoDb/event/event.repository")

async function httpCreateEvent(req, res) {
    try {
        const data = await eventRepository.create({
            ...req.body,
            image: req?.file?.filename,
        });
        res.status(201).json({ ...data, created: "ok" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpGetSingleEvent(req, res) {
    try {
        const data = await eventRepository.findById(req.params.id);

        if (!data) {
            res.status(404).json({ message: "Unknown event" });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpGetAllEvents(req, res) {
    try {
        const data = await eventRepository.getAll(req.query);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpUpdateEvent(req, res) {
    try {
        await eventRepository.update(req.params.id, req.body);
        const data = await eventRepository.findById(req.params.id);
        res.status(200).json({ ...data, updated: "ok" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpDeleteEvent(req, res) {
    try {
        await eventRepository.delete(req.params.id);
        res.status(200).json({ deleted: "ok" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function httpGetEventSubscribers(req, res) {
    try {
        const data = await eventRepository.getSubscribers(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports = {
    httpCreateEvent,
    httpGetSingleEvent,
    httpGetAllEvents,
    httpUpdateEvent,
    httpDeleteEvent,
    httpGetEventSubscribers,
};
