const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Booking, Review, ReviewImage, SpotImage, User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { Sequelize } = require("sequelize")
const { handleValidationErrors } = require('../../utils/validation');

// GET ALL SPOTS
router.get('/', async (req, res) => {
    let { page, size } = req.query;

    let pagination = {};
    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page)) {
        page = 1;
    }

    if (Number.isNaN(size)) {
        size = 25;
    }

    if (size > 48) size = 48;

    pagination.limit = size;
    pagination.size = size * (page - 1);

    const allSpots = await Spot.findAll({

        ...pagination,

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

        let average = parseFloat((totalReviews / numberOfReviews).toFixed(1));
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

    res.json({ Spots, page, size });
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

        let average = parseFloat((totalReviews / numberOfReviews).toFixed(1));
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
    const { spotId } = req.params;
    const detailsOfSpot = await Spot.findByPk(spotId, {
        include: [
            { model: Review, as: "Reviews", attributes: ['id', 'review'] },
            { model: SpotImage, as: "SpotImages", attributes: ['id', 'url', 'preview'] },
            { model: User, as: "Owner", attributes: ['id', 'firstName', 'lastName'] },
        ]
    });

    if (!detailsOfSpot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }
    const countReview = await Review.count({ where: { spotId: spotId } });
    const sumStar = await Review.sum('stars', { where: { spotId: spotId } });


    let average = parseFloat((sumStar / countReview).toFixed(1));
    detailsOfSpot.dataValues.numReviews = countReview;

    detailsOfSpot.dataValues.avgStarRating = average;


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

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
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
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    })

    // Find an review image by the spotId request parameter
    // const image = await ReviewImage.findAll(,  attributes: ['id', 'url'] });
    // console.log(image)
    // Search query for spot by its spotId
    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    // let reviewArray = [];
    // reviews.forEach(review => {
    //     reviewArray.push(review.toJSON());
    // })
    // // const newReviews = reviews.toJSON();
    // // const newReviewImages = image.toJSON();
    // let newImageArray = [];
    // image.forEach(newImage => {
    //     newImageArray.push(newImage.toJSON());
    // })

    // reviewArray[0].ReviewImages = newImageArray;
    // // newReviews.ReviewImages = newReviewImages
    res.json({ Reviews: reviews });

})

// CREATE A REVIEW FOR A SPOT BASED ON SPOT ID

router.post('/:spotId/reviews', requireAuth, async (req, res) => {

    const { spotId } = req.params;
    const { review, stars } = req.body;

    // Search query for spot by its spotId
    //  also copied from above route, fix both if breaks

    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        return res.status(404).json({
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
        return res.status(403).json({
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

    res.json(newReview)
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
    if (req.user.id !== spotExist.ownerId) {
        const bookings2 = await Booking.findAll({
            where: { spotId: spotExist.id },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        res.json({ Bookings: bookings2 })
    }

})

// CREATE A BOOKING FROM SPOT BASED ON SPOT'S ID

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    // console.log(req.params.spotId)
    const  spotId  = req.params.spotId;
    const { startDate, endDate } = req.body;
    console.log("REQ BODY === ", req.body)

    // const start = new Date(startDate)
    // start = start.toDateString();
    // const end = new Date(endDate)
    // end = end.toDateString();


    // console.log(start)
    // console.log(end)
    // console.log(start < end)

    // Search query for spot by its spotId

    const spotExist = await Spot.findByPk(spotId, { include: [{ model: Booking }] })

    if (!spotExist) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (startDate >= endDate) {
       return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }
    // Search through all the bookings
    const checkBookings = await Booking.findAll({
        where: {
            spotId: spotId,

        }
    })
    // console.log(checkBookings)
    // Iterate through all the bookings, checking each conditional
    for (let booked of checkBookings) {
        booked = booked.toJSON();
        // console.log("booked.startDate: ", booked.startDate, typeof(booked.startDate))
        // console.log("booked.endDate: ", booked.endDate, typeof(booked.endDate))
        // console.log("start: ", startDate, typeof(startDate))
        // console.log("end: ", endDate, typeof(endDate))
        // console.log("true or false: ", booked.startDate < startDate)
        // console.log("getTime: ", start.getTime(), end.getTime())
        if (booked.startDate >= startDate && booked.endDate < endDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        if (booked.startDate <= startDate && booked.endDate < endDate && startDate <= booked.endDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        if (booked.startDate <= startDate && booked.endDate > endDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        if (booked.startDate === startDate || booked.endDate === startDate || booked.startDate === endDate || booked.endDate === endDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    }

    // if (req.user.id !== spotExist.ownerId) {
    const newBooking = await Booking.build({
        spotId: spotId,
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
    })
    await newBooking.validate();
    await newBooking.save();
    console.log(newBooking.spotId)
    res.json(newBooking);
    // }
})




module.exports = router;
