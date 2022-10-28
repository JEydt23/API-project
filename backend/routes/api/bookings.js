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

router.delete('/:bookingId', requireAuth, async (req, res) => {

    const booking = await Booking.findByPk(req.params.bookingId);
    // console.log('~~~~~~~~~~> ', currentDate)
    // console.log(new Date().toDateString())
    let currentDate = new Date().getTime();
    if (!booking) {
        res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    if (currentDate > new Date(booking.startDate).getTime()) {
        res.status(403).json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })
    }

    // const spot = await Spot.findByPk({ where: { id: booking.spotId } })

    // if (booking.req.user.id === req.user.id || spot.ownerId === req.user.id) {
        await booking.destroy();
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    // }

    // // if (booking) { }
})

// EDIT A BOOKING

router.put('/:bookingId', requireAuth, async (req, res) => {

    const { bookingId } = req.params
    const { startDate, endDate } = req.body

    const booking = await Review.findByPk(bookingId);

    if (!booking) {
        res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    if (startDate >= endDate) {
        res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        })
    }

    await booking.update({ startDate, endDate })

    res.json(booking)


})










module.exports = router;
