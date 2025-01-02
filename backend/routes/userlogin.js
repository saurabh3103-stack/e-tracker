const express = require('express');
const apiKeyAuth = require('../middleware/apiKeyAuth'); 
const router = express.Router();

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/send-otp', apiKeyAuth, (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    const otp = generateOTP();
    console.log(`Sending OTP ${otp} to phone number ${phoneNumber}`);
    res.status(200).json({
        success: true,
        message: 'OTP generated successfully',
        otp,
    });
});

module.exports = router;
