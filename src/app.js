const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path"); 
const usersRouter = require('./controllers/users/users.routes'); 
const eventsRouter = require('./controllers/events/events.routes');
const subscriptionsRouter = require('./controllers/subscriptions/subscriptions.routes'); 

const app = express();

/* Middlewares */
app.use(helmet());          // Pour la sécurité, très restrictif par défaut
app.use(cors());            // Pour les cors, très permissif par défaut
app.use(morgan("dev"));     // Pour les logs, penser à configurer un dossier d'écriture des logs en production

app.use(express.json());                            // Permet de communiquer en json
app.use(express.urlencoded({ extended: true }))     // Permet de communiquer en multipart/form-data

/* Fichiers statiques */
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Permet de server index.html à la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

/* Routers */
app.use('/users', usersRouter)
app.use('/events', eventsRouter)
app.use('/subscriptions', subscriptionsRouter)


/* Gestion des erreurs */
app.use((req, res) => {
    res.status(404).json({ error: "Unknown route" });
});

app.use((error, req, res) => {
    res.status(500).json({ error: "Server error"})
})

module.exports = app;
