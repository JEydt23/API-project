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

    res.json({ Spots });
})

// GET ALL SPOTS OWNED BY CURRENT USER
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

    res.json({ Spots });

})

// GET DETAILS OF A SPOT FROM AN ID

router.get('/:spotId', async (req, res) => {
    // const { spotId } = req.params DOESN'T WORK, WHY????
    const detailsOfSpot = await Spot.findByPk(req.user.id, {
        include: [
            { model: Review, attributes: [] },
            { model: SpotImage, as: "SpotImages", attributes: ['id', 'url', 'preview'] },
            { model: User, as: "Owner", attributes: ['id', 'firstName', 'lastName'] },
        ]
    });

    const countReview = await Review.count({ where: { spotId: req.user.id } });
    const sumStar = await Review.sum('stars', { where: { spotId: req.user.id } });

    let average = sumStar / countReview;
    detailsOfSpot.dataValues.numReviews = countReview;

    detailsOfSpot.dataValues.avgStarRating = average;

    if (!detailsOfSpot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    res.json(detailsOfSpot)

});


// CREATE A SPOT

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    try {
        const createSpot = await Spot.create({
            ownerId: req.user.id,
            address, city, state, country, lat, lng, name, description, price
        })
        res.json(createSpot);

    } catch {
        res.status(400);
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }
})

module.exports = router;