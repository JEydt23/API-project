const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Booking, Review, ReviewImage, SpotImage, User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { Sequelize } = require("sequelize")
const { handleValidationErrors } = require('../../utils/validation');


router.get('/current', requireAuth, async (req, res) => {
    // const { id } = req.user.id;
    const reviews = await Review.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            { model: Review },
            { model: Spot },
            { model: ReviewImage }
        ],
    })
    res.json(reviews)
})









module.exports = router;
