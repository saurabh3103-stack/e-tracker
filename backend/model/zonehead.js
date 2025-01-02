const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const zoneHeadSchema = new mongoose.Schema({
    password: { type: String, default: null },
    name: { type: String, default: null },
    dob: { type: Date, default: null },
    aadhaar_number: { type: String, default: null },
    address: { type: String, default: null },
    designation: { type: String, default: null },
    zone_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', default: null },
    role: { type: String, default: 'zone_head' },
    mobile_number: { type: String, default: null },
    email: { type: String, default: null },
    status: { type: String, default: 'active' },
    added_by: {type:String,default:null},
    added_id: {type:String, default:null},
}, { 
    timestamps: true 
});

// Hash the password before saving
zoneHeadSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('ZoneHeadNew', zoneHeadSchema);
