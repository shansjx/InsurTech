const express = require('express');
const router = express.Router();
const BudgetT = require('../models/BudgetT');

router.get('/showWealthAssistant', (req, res) => {
    res.render('wealth/wealthAssistant');
});

//render tracker pages
router.get('/tracking/', (req, res) => {
    res.render('wealth/tracking/wealthTracking');
});

router.get('/tracking/budget', (req, res) => {
res.render('wealth/tracking/budgetTracking');
});

router.get('/tracking/budget/AddBudget', (req, res) => {
    res.render('wealth/tracking/wAddBudget');
});

router.post('/tracking/wAddBudget', (req, res) => {
    let budget = req.body.budget;
    let amount = req.body.amount;

    // Multi-value components return array of strings or undefined
    BudgetT.create({
budget,
amount
}).then((budgetT) => {
    res.redirect('/');
})
    .catch(err => console.log(err))
});


module.exports = router;