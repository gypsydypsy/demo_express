const { sequelize, DataTypes } = require("../../../config/db/sequelize");

const Event = sequelize.define("event", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 255],
                msg: "Event title must be between 2 and 255 characters long",
            },
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [2, 1000],
                msg: "Event title must be between 2 and 1000 characters long",
            },
        },
    },
    city: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            len: {
                args: [2, 255],
                msg: "Event city must be between 2 and 255 characters long",
            },
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Event;
