const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');

router.get('/showHealthAssistant', (req, res) =>{
	res.render('health/healthAssistant'); // Activates views/health/healthAssistant.handlebars
});

module.exports = router;
