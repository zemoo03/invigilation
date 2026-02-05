import express from 'express';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
    try {
        const { role, verified, page = 1, limit = 20 } = req.query;

        let query = {};

        if (role) query.role = role;
        if (verified === 'true') query.digilockerVerified = true;
        if (verified === 'false') query.digilockerVerified = false;

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.json({
            success: true,
            count: users.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
});

// @route   GET /api/users/students
// @desc    Get all students with verification status (Admin/Center)
// @access  Private/Admin,Center
router.get('/students', protect, authorize('admin', 'center'), async (req, res) => {
    try {
        const { verified, search, page = 1, limit = 20 } = req.query;

        let query = { role: 'student' };

        if (verified === 'digilocker') query.digilockerVerified = true;
        if (verified === 'manual') query['manualDocuments.verified'] = true;
        if (verified === 'pending') {
            query.digilockerVerified = false;
            query['manualDocuments.verified'] = { $ne: true };
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { 'studentDetails.enrollmentNumber': { $regex: search, $options: 'i' } }
            ];
        }

        const students = await User.find(query)
            .select('name email phone digilockerVerified digilockerData.aadhaar manualDocuments studentDetails createdAt')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        // Get verification stats
        const stats = {
            total: await User.countDocuments({ role: 'student' }),
            digilockerVerified: await User.countDocuments({ role: 'student', digilockerVerified: true }),
            manualVerified: await User.countDocuments({ role: 'student', 'manualDocuments.verified': true }),
            pending: await User.countDocuments({
                role: 'student',
                digilockerVerified: false,
                'manualDocuments.verified': { $ne: true }
            })
        };

        res.json({
            success: true,
            count: students.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            stats,
            students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch students',
            error: error.message
        });
    }
});

// @route   GET /api/users/:id
// @desc    Get single user by ID
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user',
            error: error.message
        });
    }
});

// @route   PUT /api/users/:id/verify-manual
// @desc    Manually verify a user's documents (Admin only)
// @access  Private/Admin
router.put('/:id/verify-manual', protect, authorize('admin'), async (req, res) => {
    try {
        const { approved, rejectionReason } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (approved) {
            user.manualDocuments.verified = true;
            user.manualDocuments.verifiedBy = req.user._id;
            user.manualDocuments.verifiedAt = new Date();
            user.manualDocuments.rejectionReason = null;
        } else {
            user.manualDocuments.verified = false;
            user.manualDocuments.rejectionReason = rejectionReason || 'Documents not valid';
        }

        await user.save();

        res.json({
            success: true,
            message: approved ? 'User verified successfully' : 'Verification rejected',
            user: {
                id: user._id,
                name: user.name,
                manualDocuments: user.manualDocuments
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Verification failed',
            error: error.message
        });
    }
});

// @route   GET /api/users/verification-queue
// @desc    Get pending verification queue (Admin only)
// @access  Private/Admin
router.get('/admin/verification-queue', protect, authorize('admin'), async (req, res) => {
    try {
        const pendingStudents = await User.find({
            role: 'student',
            digilockerVerified: false,
            'manualDocuments.verified': { $ne: true },
            $or: [
                { 'manualDocuments.aadhaarFront': { $exists: true, $ne: null } },
                { 'manualDocuments.photo': { $exists: true, $ne: null } }
            ]
        })
            .select('name email phone manualDocuments studentDetails createdAt')
            .sort({ createdAt: 1 })  // Oldest first
            .limit(50);

        res.json({
            success: true,
            count: pendingStudents.length,
            queue: pendingStudents
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch verification queue',
            error: error.message
        });
    }
});

export default router;
