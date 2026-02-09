const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        notifications: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
