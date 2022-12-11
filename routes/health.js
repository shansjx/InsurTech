const express = require('express');
const router = express.Router();
const moment = require('moment');
//gets model/NutritionT
const NutritionT = require('../models/NutritionT');


// always reference to /health in your view links before you get('/insertroutehere')

// Activates views/health/healthAssistant.handlebars
router.get('/showHealthAssistant', (req, res) => {
    res.render('health/healthAssistant');
});

//tracking page routes
router.get('/tracking/', (req, res) => {
    res.render('health/tracking/healthTracking');
});

router.get('/tracking/nutrition', (req, res) => {
    res.render('health/tracking/nutritionTracking');
});

//-------------------------------------------------------//
//tracking -> nutrition
router.get('/tracking/nutrition/addMeal', (req, res) => {
    res.render('health/tracking/ntAddMeal');
});
// Adds new nt meal from health/tracking/ntAddMeal
router.post('/tracking/ntAddMeal', (req, res) => {
    let meal = req.body.meal;
    let food = req.body.food;
    let calories = req.body.calories;
    let carbs = req.body.carbs;
    let fat = req.body.fat;
    let protein = req.body.protein;
    let date = moment().format('YYYY-MM-DD') ;

    // Multi-value components return array of strings or undefined
    NutritionT.create({
meal,
food,
calories,
carbs,
fat,
protein,
date
    }).then((nutritionT) => {
        res.redirect('/');
    })
        .catch(err => console.log(err))
});

module.exports = router;
