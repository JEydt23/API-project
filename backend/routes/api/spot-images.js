const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Booking, Review, ReviewImage, SpotImage, User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { Sequelize } = require("sequelize")
const { handleValidationErrors } = require('../../utils/validation');


router.delete('/:imageId', requireAuth, async (req, res) => {

    const { imageId } = req.params;
    const imageExist = await SpotImage.findByPk(imageId, { include: { model: Spot } });

    if (!imageExist) {
        res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }
    if (imageExist.Spot.ownerId === req.user.id) {
        imageExist.destroy();
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})




module.exports = router;
