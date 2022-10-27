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

    // reviews.forEach(spot => {
    //     reviewList.push(spot.toJSON())
    // })

    // Loop through all reviews
    // Then query for each review's preview image

    let reviewList = [];
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

//CREATE AN IMAGE TO REVIEW BASED ON REVIEWERS ID



router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);
    console.log(review)
    if (!review) {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    // , {
    //     include: [
    //         { model: ReviewImage }
    //     ]
    // });
    const addImage = await ReviewImage.create({
        url,
        reviewId: review.id
    })

    const checkImageIsThere = await ReviewImage.findByPk(addImage.id, {
        attributes: ['id', 'url']
    });

    // If review not found, 404

    // If more than 10 images, 403
    const howManyImages = await ReviewImage.count({ where: { reviewId: review.id } })
    if (howManyImages > 10) {
        res.status(403).json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }

    res.json({ id: checkImageIsThere.id, url: checkImageIsThere.url })
})


// EDIT A REVIEW

router.put('/:reviewId', requireAuth, async (req, res) => {

    const id = req.params.reviewId
    const { review, stars } = req.body

    const findReview = await Review.findByPk(id);

    if (!findReview) {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    await findReview.update({ review, stars })

    res.json(findReview)


})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    if (!review) {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (review.userId === req.user.id){
        review.destroy();
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }

})



module.exports = router;
