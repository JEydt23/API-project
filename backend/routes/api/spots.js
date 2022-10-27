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
            message: "Validation Error",
            statusCode: 400,
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })
    }
})

// ADD IMAGE TO SPOT BASED ON SPOT'S ID

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url } = req.body;

    const addImage = await SpotImage.create({
        spotId: req.params.spotId,
        url: url,
        preview: true
    })
    res.json({
        id: addImage.id,
        url: addImage.url,
        preview: addImage.preview
    })

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

// EDIT A SPOT

router.put('/:spotId', requireAuth, async (req, res) => {
    const id = req.params.spotId
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(id);

    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    try {
        await spot.update({
            ownerId: req.user.id,
            address, city, state, country, lat, lng, name, description, price
        });
        res.json(spot);
    } catch {
        res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })
    }
})

// DELETE A SPOT

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (spot.ownerId === req.user.id) {
        spot.destroy();
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})

// GET ALL REVIEWS BY SPOT'S ID

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

    // Find all reviews where the spotId matches the spotId request parameter
    const reviews = await Review.findAll({
        where: { spotId: spotId },
        include: {
            model: User, as: "User", attributes: ['id', 'firstName', 'lastName'],
            // model: ReviewImage, as: "ReviewImages", attributes: ['id', 'url']
        }
    })

    // Find an review image by the spotId request parameter
    const image = await ReviewImage.findByPk(spotId, { attributes: ['id', 'url'] });

    // Search query for spot by its spotId
    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    res.json({ Reviews: reviews, ReviewImages: image })

})

// CREATE A REVIEW FOR A SPOT BASED ON SPOT ID

router.post('/:spotId/reviews', requireAuth, async (req, res) => {

    const { spotId } = req.params;
    const { review, stars } = req.body;

    // Search query for spot by its spotId
    //  also copied from above route, fix both if breaks

    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const reviewExist = await Review.findOne({
        where: {
            spotId: spotId,
            userId: req.user.id
        }
    })
    if (reviewExist) {
        res.status(403).json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spotId,
        review: review,
        stars: stars
    })

    res.status(201).json(newReview)
})

// GET ALL BOOKINGS FOR SPOT BASED ON SPOT'S ID

router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    const { spotId } = req.params;

    // Search query for spot by its spotId
    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    // Check to see if current logged in user matches spot's owner's id
    if (req.user.id === spotExist.ownerId) {
        const bookings = await Booking.findAll({
            where: { spotId: spotId },
            include: { model: User, attributes: ['id', 'firstName', 'lastName'] }
        })
        res.json({ Bookings: bookings })
    }
    // Check to see if it isn't
    if (req.user.id !== spotExist.ownerId){
        const bookings2 = await Booking.findAll({
            where: { spotId: spotExist.id},
            attributes: ['spotId', 'startDate', 'endDate']
        })
        res.json({ Bookings: bookings2 })
    }



})

module.exports = router;
