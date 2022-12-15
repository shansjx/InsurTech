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

// view today budget (OLD)
// router.get('/tracking/budget', (req, res) => {
//     res.render('wealth/tracking/budgetTracking');
// });

router.get('/tracking/budget', (req, res) => {
    BudgetT.findAll({
        where:{
        },
        order:[
        ],
        raw: true
    })
        .then((budgetT) => {
            res.render('wealth/tracking/budgetTracking',{
                budgetT:budgetT
            });
        })
        .catch(err => console.log(err));
});

router.get('/tracking/budget/AddBudget', (req, res) => {
    res.render('wealth/tracking/wAddBudget');
});

//creation of new budget
router.post('/tracking/wAddBudget', (req, res) => {
    let budget = req.body.budget;
    let amount = req.body.amount;

    // Multi-value components return array of strings or undefined
    BudgetT.create({
        budget,
        amount
    }).then((budgetT) => {
        res.redirect('/wealth/tracking/budget');
    })
        .catch(err => console.log(err))
});

router.get('/tracking/budget/showEditBudgets', (req, res) => {
    BudgetT.findAll({
        where:{
        },
        order:[
        ],
        raw: true
    })
        .then((budgetT) => {
            res.render('wealth/tracking/wShowEditBudgets',{
                budgetT:budgetT
            });
        })
        .catch(err => console.log(err));
});

router.get('/tracking/wEditBudget/:id', (req,res) => {
    BudgetT.findOne({
        where:{
            id: req.params.id
        },
        order: [

        ],
        raw: true
    })
        .then((budgetT) => {
            res.render('wealth/tracking/wEditBudget', {
                budgetT:budgetT
            });
        })
        .catch(err => console.log(err));
});

router.put('/tracking/saveEditedBudget/:id', (req,res) => {
    let budget = req.body.budget;
    let amount = req.body.amount;

    BudgetT.update({
        budget,
        amount
    },{
        where: {
            id: req.params.id
        }
    }).then((budgetT)=>{
        res.redirect('/wealth/tracking/budget');
    }).catch(err => console.log(err))
});

module.exports = router;