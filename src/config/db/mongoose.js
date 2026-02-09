const mongoose = require("mongoose");

const mongoConnect = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_USER_MONGO}:${process.env.DB_PWD_MONGO}@localhost:27017/${process.env.DB_NAME}?authSource=admin`);
        console.log("Connexion établie à la base de données mongoDb");
    } catch (error) {
        console.error("Error connecting to database: ", error);
        process.exit(1);
    }
};

module.exports = mongoConnect; 