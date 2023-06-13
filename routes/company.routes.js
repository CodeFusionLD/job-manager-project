const express = require('express');
const router = express.Router();


const Company = require('../models/Company.model');


router.get("/companies", (req, res, next) => {
    Company.find()
        .then(companies => {
            res.render("companies/companies", { companies });
        })
        .catch(e => {
            console.log("error getting list of companies from DB", e);
            next(e);
        });
});


module.exports = router;