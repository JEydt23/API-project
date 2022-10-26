const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Booking, Review, ReviewImage, SpotImage, User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { Sequelize, Model } = require("sequelize")
const { handleValidationErrors } = require('../../utils/validation');

// GET REVIEWS OF CURRENT USER

router.get('/current', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, as: "ReviewImages", attributes: ['id', 'url'] },
            {
                model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
                include: { model: SpotImage, where: { preview: true }, attributes: ['url'] }
            },

        ],
    })

    let reviewList = [];
    // reviews.forEach(spot => {
    //     reviewList.push(spot.toJSON())
    // })

    // Loop through all reviews (OBJECT, not array)
    // Then query for each review's preview image

    for (let review of reviews) {
        review = review.toJSON();
        const imagePrev = await SpotImage.findByPk(review.id, {
            where: { preview: true },
            attributes: ['url'],

        })

        // reviewList.forEach(spot => {
        //     spot.SpotImages.forEach(image => {
        //         // console.log(image.preview)

        //         if (image.preview === true) {
        //             spot.previewImage = image.url;
        //         }
        if (imagePrev) {
            review.Spot.previewImage = imagePrev.url
        }

        //     })

        // if (!spot.previewImage) {
        //     spot.previewImage = 'No preview image found';
        // }
        if (!imagePrev) {
            review.Spot.previewImage = 'No preview image found';
        }
        // })
        reviewList.push(review)
        delete review.Spot.SpotImages;
    }

    res.json({ Reviews: reviewList })
})

//ADD AN IMAGE TO REVIEW BASED ON REVIEWERS ID

// getting null for req.params 

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url } = req.body;

    console.log(req.params)
    console.log(url)

    const review = await Review.findByPk(reviewId);
    const addImage = await ReviewImage.create({
        url,
        reviewId: review.id
    })

    const checkImageIsThere = await ReviewImage.findByPk(addImage.id, { attributes: ['id', 'url'] });

    res.json(checkImageIsThere)
})







module.exports = router;
