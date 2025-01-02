const mongoose = require('mongoose');

const routesSchema = new mongoose.Schema({
    start_point: {
        type: String,
    },
    end_point: {
        type: String,
    },
    status: {
        type: Number,
        default: 1,
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Admin collection
        ref: 'Admin',
        required: true, // Ensure admin_id is always provided
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Routes_path = mongoose.model('Routes_path', routesSchema);
module.exports = Routes_path;
