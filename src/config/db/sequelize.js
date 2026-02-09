const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    {
        dialect: "mysql",
        host: process.env.DB_HOST,
    },
);

async function connectDB() {
    const Event = require("../../models/sequelize/event/event.model");
    const User = require("../../models/sequelize/user/user.model");
    const Subscription = require("../../models/sequelize/subscription/subscription.model");
    require('../../models/sequelize/association'); 

    await sequelize.sync(/* { force: true } */);
    console.log("Connection établie à la base de données")
}

module.exports = {
    sequelize,
    connectDB,
    DataTypes,
};
