const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Booking, Review, ReviewImage, SpotImage, User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { Sequelize, Model } = require("sequelize")
const { handleValidationErrors } = require('../../utils/validation');

// GET BOOKINGS FOR CURRENT USER

router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] } },
        ]
    })

    let bookingsList = [];
    for (let booking of bookings) {
        booking = booking.toJSON();
        const imagePrev = await SpotImage.findByPk(booking.id, {
            where: { preview: true },
            attributes: ['url'],

        })

        if (imagePrev) {
            booking.Spot.previewImage = imagePrev.url
        }

        if (!imagePrev) {
            booking.Spot.previewImage = 'No preview image found';
        }

        bookingsList.push(booking)
        delete booking.Spot.SpotImages;
    }

    res.json({ Bookings: bookingsList })
})













module.exports = router;
