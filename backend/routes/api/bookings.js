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
    for (let booking = 0; booking < bookings.length; booking++) {
        bookings[booking] = bookings[booking].toJSON();
        const imagePrev = await SpotImage.findByPk(bookings[booking].spotId, {
            where: { preview: true },
            attributes: ['url'],
        })
        // console.log("image prev ==== ", imagePrev.dataValues)
        if (imagePrev) {
            // console.log("bookingSPOT", bookings)
            bookings[booking].previewImage = imagePrev.dataValues.url
        }
        if (!imagePrev) {
            bookings[booking].previewImage = 'No preview image found';
        }


        bookingsList.push(bookings[booking])
        // delete booking.Spot.SpotImages;
    }
    // console.log("bookingList === ", bookingsList)
    return res.json({ Bookings: bookingsList })
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    
    const booking = await Booking.findByPk(req.params.bookingId);
    // console.log('~~~~~~~~~~> ', currentDate)
    // console.log(new Date().toDateString())
    let currentDate = new Date().getTime();
    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    if (currentDate > new Date(booking.startDate).getTime()) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })
    }

    // const spot = await Spot.findByPk({ where: { id: booking.spotId } })

    // if (booking.req.user.id === req.user.id || spot.ownerId === req.user.id) {
    await booking.destroy();
    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })

})

// EDIT A BOOKING

router.put('/:bookingId', requireAuth, async (req, res) => {

    const { bookingId } = req.params
    const { startDate, endDate } = req.body

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    if (startDate >= endDate) {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        })
    }
    // const bookingJson = booking.toJSON();
    // const updateBooking = await booking.update({ startDate, endDate, })
    booking.startDate = startDate
    booking.endDate = endDate
    res.json(booking)


})










module.exports = router;
