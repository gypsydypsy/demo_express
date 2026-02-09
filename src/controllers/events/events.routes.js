const express = require("express");
const isAuth = require("../../middlewares/isAuth");
const upload = require("../../config/multer"); 

const {
    httpGetAllEvents,
    httpGetSingleEvent,
    httpCreateEvent,
    httpUpdateEvent,
    httpDeleteEvent,
    httpGetEventSubscribers,
} = require("./events.controller");

const router = express.Router();

router.post("/", /* isAuth, */ upload.single('file'), httpCreateEvent);
router.get("/", httpGetAllEvents);
router.get("/:id", httpGetSingleEvent);
router.put("/:id", isAuth, httpUpdateEvent);
router.delete("/:id", isAuth, httpDeleteEvent);
router.get('/:id/subscribers', /* isAuth, */ httpGetEventSubscribers)

module.exports = router;
