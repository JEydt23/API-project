const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Booking, Review, ReviewImage, SpotImage, User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { Sequelize } = require("sequelize")
const { handleValidationErrors } = require('../../utils/validation');

// GET ALL SPOTS
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ],
    })
    // allSpots.toJSON()
    // console.log(allSpots)

    let spotList = [];
    allSpots.forEach(spot => {
        spotList.push(spot.toJSON())
    })

    spotList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            // console.log(image.preview)
            if (image.preview === true) {
                spot.preview = image.url
            }
        })
        if (!spot.preview) {
            spot.preview = 'No preview image found'
        }
    })


    res.json(spotList)
})

module.exports = router;
