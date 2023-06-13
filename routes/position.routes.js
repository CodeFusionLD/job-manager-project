const express = require('express');
const router = express.Router();

const Position = require('../models/Position.model');
const Company = require('../models/Company.model');

const isLoggedIn = require('../middleware/isLoggedIn');



// READ: display all positions
router.get("/positions", (req, res, next) => {
    Position.find()
        .populate("company")
        .then( (positionsFromDB) => {

            const data = {
                positions: positionsFromDB
            }

            res.render("positions/positions", data);
        })
        .catch( e => {
            console.log("error getting list of positions from DB", e);
            next(e);
        });
});



// CREATE: Company in positions-create
router.get("/positions/create", isLoggedIn, (req, res, next) => {
    Company.find()
        .then( companiesFromDB => {
            res.render("positions/position-create", {companiesArr: companiesFromDB});
        })
        .catch( e => {
            console.log("error displaying position create form", e);
            next(e);
        });
});



// CREATE: Position in position-create
router.post("/positions/create", isLoggedIn, (req, res, next) => {

    const newPosition = {
        title: req.body.title,
        company: req.body.company,
        description: req.body.description,
        salarywish: req.body.salarywish,
        jobrating: req.body.jobrating
    };

    // Company.findOne({name: req.body.name})
    // .then((existingCompany) => {
    //     if (existingCompany) {
    //         newPosition.company = existingCompany._id
    //     }
    //     else {

    //         const newCompany = {
    //             name: req.body.name,
    //         };

    //         Company.create(newCompany)
    //             .then((createdCompany) => {
    //                 newPosition.company = createdCompany._id;
    //             })
    //             .catch((e) => {
    //                 console.log("error creating new company", e);
    //                 next(e);
    //             });
    //     }
            // const newCompany = {
            //     name: req.body.name
            // }
            //         Company.create(newCompany)
            //         const newCompany = {
            //         name: req.body.name,
            //         };
        


    Position.create(newPosition)
        .then( (newPosition) => {
            res.redirect("/positions");
        })
        .catch( e => {
            console.log("error creating new position", e);
            next(e);
        });
});



// UPDATE: Company and Position details in position edit
router.get('/positions/:positionId/edit', isLoggedIn, async (req, res, next) => {
    const { positionId } = req.params;

    try {
        const companies = await Company.find();
        const positionDetails = await Position.findById(positionId);

        res.render('positions/position-edit.hbs', { position: positionDetails, companies: companies });

    } catch (e) {
        next(e);
    }

});



// UPDATE: Company and Position details in position edit
router.post('/positions/:positionId/edit', isLoggedIn, (req, res, next) => {
    const { positionId } = req.params;
    const { title, description, company, rating } = req.body;

    Position.findByIdAndUpdate(positionId, { title, description, company, rating }, { new: true })
        .then(updatedPosition => res.redirect(`/positions/${updatedPosition.id}`)) // go to the details page to see the updates
        .catch(error => next(error));
});



// DELETE
router.post('/positions/:positionId/delete', isLoggedIn, (req, res, next) => {
    const { positionId } = req.params;

    Position.findByIdAndDelete(positionId)
        .then(() => res.redirect('/positions'))
        .catch(error => next(error));
});



// READ
router.get("/positions/:positionId", (req, res, next) => {
    const id = req.params.positionId;

    Position.findById(id)
        .populate("company")
        .then( positionFromDB => {
            res.render("positions/position-details", positionFromDB);
        })
        .catch( e => {
            console.log("error getting position details from DB", e);
            next(e);
        });
});



module.exports = router;
