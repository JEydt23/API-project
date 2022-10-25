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

    for (let spot of allSpots) {
        // spot = spot.toJSON();
        let totalReviews = await Review.sum('stars', { where: { spotId: spot.id } });
        // console.log('****total review stars: ', totalReviews)

        let numberOfReviews = await Review.count({ where: { spotId: spot.id } });
        // console.log('****number of reviews: ', numberOfReviews);

        // totalReviews = parseInt(totalReviews);
        // numberOfReviews = parseInt(numberOfReviews);

        let average = totalReviews / numberOfReviews;
        // console.log('*************average: ', average)
        spot.dataValues.avgRating = average;

        delete spot.dataValues.Reviews

    }

    let Spots = [];
    allSpots.forEach(spot => {
        Spots.push(spot.toJSON())
    })

    Spots.forEach(spot => {
        spot.SpotImages.forEach(image => {
            // console.log(image.preview)
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found';
        }
        delete spot.SpotImages;
    })

    res.json({Spots});
})

// GET ALL SPOTS OWNED BY CURRENT OWNER
router.get('/current', requireAuth, async (req, res) => {
    const allSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            { model: Review },
            { model: SpotImage }
        ],
    })

    for (let spot of allSpots) {
        // spot = spot.toJSON();
        let totalReviews = await Review.sum('stars', { where: { spotId: spot.id } });
        // console.log('****total review stars: ', totalReviews)

        let numberOfReviews = await Review.count({ where: { spotId: spot.id } });
        // console.log('****number of reviews: ', numberOfReviews);

        // totalReviews = parseInt(totalReviews);
        // numberOfReviews = parseInt(numberOfReviews);

        let average = totalReviews / numberOfReviews;
        // console.log('*************average: ', average)
        spot.dataValues.avgRating = average;

        delete spot.dataValues.Reviews

    }

    let Spots = [];
    allSpots.forEach(spot => {
        Spots.push(spot.toJSON())
    })

    Spots.forEach(spot => {
        spot.SpotImages.forEach(image => {
            // console.log(image.preview)
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found';
        }
        delete spot.SpotImages;
    })

    res.json({Spots});

})

module.exports = router;
