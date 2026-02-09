const express = require('express'); 
const isAuth = require('../../middlewares/isAuth'); 

const { httpGetAllSubscriptions, httpGetSingleSubscription, httpCreateSubscription, httpUpdateSubscription, httpDeleteSubscription } = require('./subscriptions.controller');

const router = express.Router(); 

router.post('/', /* isAuth, */ httpCreateSubscription)
router.get('/', httpGetAllSubscriptions)
router.get('/:id', httpGetSingleSubscription)
router.put('/:id', isAuth, httpUpdateSubscription)
router.delete('/:id', isAuth, httpDeleteSubscription)

module.exports = router; 