const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, "Event title must be at least 2 characters long"],
        maxLength: [255, "Event title must be less than 255 characaters long"],
    },
    description: {
        type: String,
        required: false,
        maxLength: [
            1000,
            "Event description must be less than 1000 characters long",
        ],
    },
    city: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    subscribers: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
