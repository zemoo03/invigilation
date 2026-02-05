import express from 'express';
import Center from '../models/Center.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/centers
// @desc    Get all centers
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { city, state, status = 'approved' } = req.query;

        let query = { verificationStatus: status, isActive: true };
        if (city) query['address.city'] = { $regex: city, $options: 'i' };
        if (state) query['address.state'] = { $regex: state, $options: 'i' };

        const centers = await Center.find(query)
            .populate('manager', 'name email')
            .sort({ name: 1 });

        res.json({
            success: true,
            count: centers.length,
            centers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch centers',
            error: error.message
        });
    }
});

// @route   POST /api/centers
// @desc    Register a new center
// @access  Private/Center
router.post('/', protect, authorize('center'), async (req, res) => {
    try {
        const { name, code, address, capacity, facilities, contactEmail, contactPhone } = req.body;

        const center = await Center.create({
            name,
            code: code.toUpperCase(),
            address,
            capacity,
            facilities,
            contactEmail,
            contactPhone,
            manager: req.user._id,
            verificationStatus: 'pending'
        });

        // Update user's center details
        req.user.centerDetails = {
            centerName: name,
            centerCode: code,
            address: `${address.street}, ${address.city}`,
            city: address.city,
            state: address.state,
            capacity
        };
        await req.user.save();

        res.status(201).json({
            success: true,
            message: 'Center registration submitted for approval',
            center
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to register center',
            error: error.message
        });
    }
});

// @route   PUT /api/centers/:id/verify
// @desc    Verify/approve a center (Admin only)
// @access  Private/Admin
router.put('/:id/verify', protect, authorize('admin'), async (req, res) => {
    try {
        const { status, rejectionReason } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const center = await Center.findByIdAndUpdate(
            req.params.id,
            {
                verificationStatus: status,
                verifiedBy: req.user._id,
                verifiedAt: new Date(),
                ...(status === 'rejected' && { rejectionReason })
            },
            { new: true }
        );

        if (!center) {
            return res.status(404).json({
                success: false,
                message: 'Center not found'
            });
        }

        res.json({
            success: true,
            message: `Center ${status} successfully`,
            center
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Verification failed',
            error: error.message
        });
    }
});

// @route   GET /api/centers/pending
// @desc    Get pending center verifications (Admin only)
// @access  Private/Admin
router.get('/admin/pending', protect, authorize('admin'), async (req, res) => {
    try {
        const centers = await Center.find({ verificationStatus: 'pending' })
            .populate('manager', 'name email phone')
            .sort({ createdAt: 1 });

        res.json({
            success: true,
            count: centers.length,
            centers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch pending centers',
            error: error.message
        });
    }
});

export default router;
