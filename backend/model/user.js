const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    owner_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone_owner: {
        type: String,
        required: true
    },
    owner_photo: {
        type: String,
        required: true
    },
    addhar_number: {
        type: String,
        required: true
    },
    addhar_image: {
        type: String 
    },
    owner_dl: {
        type: String // Driver's license number
    },
    owner_dl_image: {
        type: String // URL or path to the uploaded driver's license
    },
    e_rickshaw: {
        type: String, // Registration number of the E-Rickshaw
        required: true
    },
    chassis: {
        type: String, // Chassis number of the vehicle
        required: true
    },
    fitness: {
        type: String,
        default: null
    },
    rickshaw_photo: {
        type: String, // Photo of the E-Rickshaw
        required: true
    },
    address_line_f: {
        type: String,
        required: true
    },
    address_line_t: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pin_code: {
        type: String,
        required: true
    },
    driver_name: {
        type: String,
        required: true
    },
    d_phone: {
        type: Number,
        required: true
    },
    d_addhar_number: {
        type: String, 
        required: true
    },
    d_addhar_image: {
        type: String, // URL or path to the driver's Aadhar card photo
        required: true
    },
    d_photo: {
        type: String, // URL or path to the uploaded driver's photo
        required: true
    },
    d_dl_number: {
        type: String, // Driver's license number
        required: true
    },
    driver_dl_image: {
        type: String, // URL or path to the uploaded driver's license
        required: true
    },
    d_address_line_f: {
        type: String,
        required: true
    },
    d_address_line_t: {
        type: String
    },
    d_city: {
        type: String,
        required: true
    },
    d_state: {
        type: String,
        required: true
    },
    d_pin_code: {
        type: String,
        required: true
    },
    e_ricksaw_route: {
        type: String 
    },
    qr_assing_statu: {
        type: Number,
        default: 0
    },
    qrID: {
        type: String,
        default: null
    },
    status:{
        type:String,
        default : "0"
    },
    added_id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Admin', 
           default: null
       },
       added_by: {
           type: String, 
           default: null
       },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets current date
    }
});

const User = mongoose.model('test_users', userSchema);
module.exports = User;
