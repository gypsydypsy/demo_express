const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            trim: true, // Enleve les espaces en début et en fin de chaine
            lowercase: true, // Convertit l'email en minuscules avant de sauvegarder
            match: [/^\S+@\S+\.\S+$/, "Email is not valid."],
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
            min: [0, "Age is incorrect"],
        }, 
        subscriptions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subscription'}]
    },
    {
        timestamps: true, // Ajoute automatiquement les champs `createdAt` et `updatedAt`
        toJSON: {
            // Permet de remanier le retour json
            transform: function (doc, ret) {
                ret.id = ret._id; // Transform le _id de mongo en classique id (assure compatibilité avec Sequelize)
                delete ret._id;
            },
        },
    },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
