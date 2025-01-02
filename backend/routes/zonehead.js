const express = require('express');
const ZoneHead = require('../model/ZoneHead');
const auth = require('../middleware/apiKeyAuth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { password, name, dob, aadhaar_number, address, designation, zone_id, mobile_number, email,added_by, added_id } = req.body;

    try {
        const existingUser = await ZoneHead.findOne({ 
            $or: [{ aadhaar_number }]
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User or Aadhaar number already exists' });
        }

        const zoneHead = new ZoneHead({ password, name, dob, aadhaar_number, address, designation, zone_id, mobile_number, email,added_by, added_id });
        await zoneHead.save();

        res.status(201).json({ 
            message: 'Zone Head registered successfully', 
            created_at: zoneHead.createdAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const zoneHead = await ZoneHead.findOne({ email });
        if (!zoneHead) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, zoneHead.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: zoneHead._id, role: zoneHead.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const zones = await ZoneHead.find(); 
        
        if (!zones || zones.length === 0) {
            return res.status(404).json({ message: 'No zones found' });
        }
        res.status(200).json(zones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get ZoneHead Profile by id from URL parameter
router.get('/profile/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const zoneHead = await ZoneHead.findById(id).populate('zone_id');

        if (!zoneHead) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(zoneHead);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.get('/admin/:adminId', auth, async (req, res) => {
    const { adminId } = req.params;

    try {
        const zoneHeads = await ZoneHead.find({ added_id: adminId }).populate('zone_id');
        if (!zoneHeads || zoneHeads.length === 0) {
            return res.status(404).json({ message: 'No ZoneHead found for the specified admin' });
        }
        res.status(200).json(zoneHeads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/status/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 
    try {
        const zoneHead = await ZoneHead.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!zoneHead) {
            return res.status(404).json({ message: 'ZoneHead not found' });
        }
        res.status(200).json({
            message: `ZoneHead status updated to ${status ? 'active' : 'inactive'}`,
            zoneHead,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

router.delete('/delete/:id', auth, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const zoneHead = await ZoneHead.findByIdAndDelete(id);
        if (!zoneHead) {
            return res.status(404).json({ message: 'ZoneHead not found' });
        }
        res.status(200).json({ message: 'ZoneHead deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});
router.put('/update/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { password, name, dob, aadhaar_number, address, designation, zone_id, mobile_number, email, added_by, added_id } = req.body;
    try {
        const zoneHead = await ZoneHead.findById(id);
        if (!zoneHead) {
            return res.status(404).json({ message: 'ZoneHead not found' });
        }
        zoneHead.password = password || zoneHead.password;
        zoneHead.name = name || zoneHead.name;
        zoneHead.dob = dob || zoneHead.dob;
        zoneHead.aadhaar_number = aadhaar_number || zoneHead.aadhaar_number;
        zoneHead.address = address || zoneHead.address;
        zoneHead.designation = designation || zoneHead.designation;
        zoneHead.zone_id = zone_id || zoneHead.zone_id;
        zoneHead.mobile_number = mobile_number || zoneHead.mobile_number;
        zoneHead.email = email || zoneHead.email;
        zoneHead.added_by = added_by || zoneHead.added_by;
        zoneHead.added_id = added_id || zoneHead.added_id;
        await zoneHead.save();
        res.status(200).json({
            message: 'ZoneHead updated successfully',
            zoneHead,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});
module.exports = router;
