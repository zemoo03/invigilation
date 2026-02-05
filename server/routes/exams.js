import express from 'express';
import Exam from '../models/Exam.js';
import Center from '../models/Center.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/exams
// @desc    Get all exams
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const { status, center, page = 1, limit = 20 } = req.query;

        let query = {};
        if (status) query.status = status;
        if (center) query.center = center;

        const exams = await Exam.find(query)
            .populate('center', 'name code address')
            .populate('createdBy', 'name email')
            .sort({ examDate: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Exam.countDocuments(query);

        res.json({
            success: true,
            count: exams.length,
            total,
            pages: Math.ceil(total / limit),
            exams
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch exams',
            error: error.message
        });
    }
});

// @route   POST /api/exams
// @desc    Create new exam
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const { name, description, examDate, startTime, endTime, duration, centerId, totalSlots } = req.body;

        // Verify center exists
        const center = await Center.findById(centerId);
        if (!center) {
            return res.status(404).json({
                success: false,
                message: 'Exam center not found'
            });
        }

        const exam = await Exam.create({
            name,
            description,
            examDate,
            startTime,
            endTime,
            duration,
            center: centerId,
            totalSlots,
            availableSlots: totalSlots,
            createdBy: req.user._id,
            status: 'draft'
        });

        res.status(201).json({
            success: true,
            message: 'Exam created successfully',
            exam
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create exam',
            error: error.message
        });
    }
});

// @route   PUT /api/exams/:id/publish
// @desc    Publish an exam
// @access  Private/Admin
router.put('/:id/publish', protect, authorize('admin'), async (req, res) => {
    try {
        const exam = await Exam.findByIdAndUpdate(
            req.params.id,
            { status: 'published' },
            { new: true }
        ).populate('center', 'name code');

        if (!exam) {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        res.json({
            success: true,
            message: 'Exam published successfully',
            exam
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to publish exam',
            error: error.message
        });
    }
});

// @route   POST /api/exams/:id/register
// @desc    Register a student for an exam
// @access  Private/Student
router.post('/:id/register', protect, authorize('student'), async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);

        if (!exam) {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        if (exam.status !== 'published') {
            return res.status(400).json({
                success: false,
                message: 'Exam is not open for registration'
            });
        }

        if (exam.availableSlots <= 0) {
            return res.status(400).json({
                success: false,
                message: 'No slots available for this exam'
            });
        }

        // Check if already registered
        const alreadyRegistered = exam.registeredStudents.find(
            s => s.student.toString() === req.user._id.toString()
        );

        if (alreadyRegistered) {
            return res.status(400).json({
                success: false,
                message: 'You are already registered for this exam'
            });
        }

        // Generate seat number
        const seatNumber = `SEAT-${exam.registeredStudents.length + 1}`.padStart(10, '0');

        // Register student
        exam.registeredStudents.push({
            student: req.user._id,
            seatNumber
        });
        exam.availableSlots -= 1;

        await exam.save();

        res.json({
            success: true,
            message: 'Successfully registered for exam',
            registration: {
                examName: exam.name,
                examDate: exam.examDate,
                seatNumber
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});

// @route   GET /api/exams/:id/students
// @desc    Get registered students for an exam (with verification status for invigilators)
// @access  Private/Admin,Center
router.get('/:id/students', protect, authorize('admin', 'center'), async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id)
            .populate({
                path: 'registeredStudents.student',
                select: 'name email phone digilockerVerified digilockerData.aadhaar.maskedNumber digilockerData.aadhaar.photo manualDocuments.verified studentDetails'
            });

        if (!exam) {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        const students = exam.registeredStudents.map(reg => ({
            seatNumber: reg.seatNumber,
            registeredAt: reg.registeredAt,
            attended: reg.attended,
            verifiedByInvigilator: reg.verifiedByInvigilator,
            student: {
                id: reg.student._id,
                name: reg.student.name,
                email: reg.student.email,
                phone: reg.student.phone,
                digilockerVerified: reg.student.digilockerVerified,
                aadhaarMasked: reg.student.digilockerData?.aadhaar?.maskedNumber,
                photo: reg.student.digilockerData?.aadhaar?.photo,
                manualVerified: reg.student.manualDocuments?.verified,
                enrollmentNumber: reg.student.studentDetails?.enrollmentNumber
            }
        }));

        res.json({
            success: true,
            exam: {
                id: exam._id,
                name: exam.name,
                date: exam.examDate
            },
            totalRegistered: students.length,
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

export default router;
