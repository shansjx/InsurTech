const express = require('express');
const router = express.Router();
const moment = require('moment');
const alertMessage = require('../helpers/messenger'); // Bring in alert messenger

//gets model/NutritionT
const NutritionT = require('../models/NutritionT');


// always reference to /health in your view links before you get('/insertroutehere')

// Activates views/health/healthAssistant.handlebars
router.get('/showHealthAssistant', (req, res) => {
    res.render('health/healthAssistant');
});

//tracking page routes to nutrition+fitness pgs
router.get('/tracking/', (req, res) => {
    res.render('health/tracking/healthTracking');
});

//-------------------------------------------------------//
//tracking -> nutrition

//view today nutrition (OLD)
// router.get('/tracking/nutrition', (req, res) => {
//     res.render('health/tracking/nutritionTracking');
// });

router.get('/tracking/nutrition', (req, res) => {
    NutritionT.findAll({
        where: {
        },
        order: [
        ],
        raw: true
    })
        .then((nutritionT) => {
            res.render('health/tracking/nutritionTracking', {
                nutritionT: nutritionT
            });
        })
        .catch(err => console.log(err));
});

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
    let date = moment().format('YYYY-MM-DD');

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
        //redirects to the URL derived from the specified path
        res.redirect('/health/tracking/nutrition');
    })
        .catch(err => console.log(err))
});

//same as nutritiontracking view but showing edit and delete icons to click 
router.get('/tracking/nutrition/showEditMeals', (req, res) => {
    NutritionT.findAll({
        where: {
        },
        order: [
        ],
        raw: true
    })
        .then((nutritionT) => {
            res.render('health/tracking/ntShowEditMeals', {
                nutritionT: nutritionT
            });
        })
        .catch(err => console.log(err));
});
router.get('/tracking/ntEditMeal/:id', (req, res) => {
    NutritionT.findOne({
        where: {
            id: req.params.id
        },
        order: [
        ],
        raw: true
    })
        .then((nutritionT) => {
            res.render('health/tracking/ntEditMeal', {
                nutritionT: nutritionT
            });
        })
        .catch(err => console.log(err));
});
// Save edited meal
router.put('/tracking/saveEditedMeal/:id', (req, res) => {
    let meal = req.body.meal;
    let food = req.body.food;
    let calories = req.body.calories;
    let carbs = req.body.carbs;
    let fat = req.body.fat;
    let protein = req.body.protein;
    let date = moment().format('YYYY-MM-DD');

    NutritionT.update({
        meal,
        food,
        calories,
        carbs,
        fat,
        protein,
        date
    }, {
        where: {
            id: req.params.id
        }
    }).then((nutritionT) => {
        res.redirect('/health/tracking/nutrition');
    }).catch(err => console.log(err))
});
// Delete the nutritionT meal
router.get('/tracking/ntDeleteMeal/:id', (req, res) => {
    NutritionT.findOne({
        where: {
            id: req.params.id
        }
    }).then((nutritionT) => {
        let meal = nutritionT.meal; // to store the nutritionT meal to display in success message
        // if(req.user.id === nutritionT.id){
        NutritionT.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => { //Re-direct to the meal list page with the appropriate success message
            // alertMessage(res, 'success', meal + ' Meal deleted', 'fa-solid fa-trash', true);
            res.redirect('/health/tracking/nutrition');
        })
    // }else{
    //     alertMessage(res, 'danger', 'Unauthorised access', 'fas fa-exclamation-circle', true);
    //     // res.redirect('/logout');
    // }
    }).catch(err => console.log(err)); // To catch no nutritionT ID
});

//-------------------------------------------------------//
// 

module.exports = router;
