const { sequelize, DataTypes } = require("../../../config/db/sequelize");
const User = require("../user/user.model");

const Subscription = sequelize.define('subscription', {
    user_id: {
        type: DataTypes.INTEGER, 
        references: {
            model: User, 
            key: 'id'
        }
    }, 
    event_id: {
        type: DataTypes.INTEGER, 
        references: {
            model: Event, 
            key: 'id'
        }
    }, 
    notifications: {
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
    }
})

module.exports = Subscription