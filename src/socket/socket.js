const { Server } = require("socket.io");

let io = null;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", // A configurer pour la prod
            methods: ["POST", "GET"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Nouveau client connecté: " + socket.id);

        io.on("disconnect", (socket) => {
            console.log("Client déconnecté: " + socket.id);
        });

        io.emit("welcome", {
            message: "Connexion établie avec succès",
            socketId: socket.id,
            timestamp: new Date().toISOString(),
        });
    });

    console.log("Socket.io initialisé avec succès");
    return io;
}

// Exemple d'utilisation dans users.controller.js (POST)
function broadcastNotification(eventType, data) {
    if (!io) {
        console.log("Socket.io non initialisé");
        return;
    }

    const notification = {
        type: eventType,
        data: data,
        timestamp: new Date().toISOString(),
    };

    io.emit(eventType, notification);
}

function getConnectedClientsCount() {
    return io ? io.engine.clientsCount : 0;
}

module.exports = {
    initializeSocket,
    broadcastNotification,
    getConnectedClientsCount,
};
