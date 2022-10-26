const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Booking, Review, ReviewImage, SpotImage, User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { Sequelize, Model } = require("sequelize")
const { handleValidationErrors } = require('../../utils/validation');

// GET REVIEWS OF CURRENT USER

// NOT WORKING

router.get('/current', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] } },
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, as: "ReviewImages", attributes: ['id', 'url'] },

        ],
    })

    let reviewList = [];
    reviews.forEach(spot => {
        reviewList.push(spot.toJSON())
    })

    reviewList.forEach(spot => {

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


    res.json(reviews)
})









module.exports = router;
