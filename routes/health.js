const express = require('express');
const router = express.Router();
const moment = require('moment');
const alertMessage = require('../helpers/messenger'); // Bring in alert messenger

//gets model/NutritionT
const NutritionT = require('../models/NutritionT');

//gets model/HeightT
const HeightT = require('../models/heightT');

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

//healthAssistant page routes to healthReport page
router.get('/report/', (req, res) => {
    HeightT.findAll({
        where: {
        },
        order: [
        ],
        raw: true
    })
        .then((heightT) => {
            res.render('health/report/healthRecord', {
                heightT: heightT
            });
        })
        .catch(err => console.log(err));
});
//-------------------------------------------------------//
//report -> healthRecord
router.get('/report/addHeight', (req, res) => {
    res.render('health/report/hrAddHeight');
});
router.post('/report/hrAddHeight', (req, res) => {
    let userid = 1;
    let height = req.body.height;
    let date = req.body.date;
    let time = req.body.time;

    HeightT.create({
        userid,
        height,
        date,
        time
    }).then((height) => {
        //redirects to the URL derived from the specified path
        res.redirect('/health/report/');
    })
        .catch(err => console.log(err))
});

router.get('/report/hrEditHeight/:id', (req, res) => {
    HeightT.findOne({
        where: {
            id: req.params.id
        },
        order: [
        ],
        raw: true
    })
        .then((heightT) => {
            res.render('health/report/hrEditHeight', {
                heightT: heightT
            });
        })
        .catch(err => console.log(err));
});

router.put('/report/editedHeight/:id', (req, res) => {
    let userid = 1;
    let height = req.body.height;
    let date = req.body.date;
    let time = req.body.time;

    HeightT.update({
        userid,
        height,
        date,
        time
    }, {
        where: {
            id: req.params.id
        }
    }).then((heightT) => {
        res.redirect('/health/report/');
    }).catch(err => console.log(err))
});

router.get('/report/deleteHeight', (req, res) => {
    HeightT.findAll({
        where: {
        },
        order: [
        ],
        raw: true
    })
        .then((heightT) => {
            res.render('health/report/hrDeleteHeight', {
                heightT: heightT
            });
        })
        .catch(err => console.log(err));
});

router.get('/report/hrDeleteHeight/:id', (req, res) => {
    HeightT.findOne({
        where: {
            id: req.params.id
        }
    }).then((heightT) => {
        HeightT.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => { 
            res.redirect('/health/report');
        })
    }).catch(err => console.log(err)); 
});

//-------------------------------------------------------//





module.exports = router;
