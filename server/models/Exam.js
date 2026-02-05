import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Exam name is required'],
        trim: true
    },
    description: String,
    examDate: {
        type: Date,
        required: [true, 'Exam date is required']
    },
    startTime: String,
    endTime: String,
    duration: Number, // in minutes

    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        required: true
    },

    totalSlots: {
        type: Number,
        required: true
    },
    availableSlots: {
        type: Number,
        required: true
    },

    registeredStudents: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        registeredAt: { type: Date, default: Date.now },
        seatNumber: String,
        attended: { type: Boolean, default: false },
        verifiedByInvigilator: { type: Boolean, default: false },
        verificationNotes: String
    }],

    status: {
        type: String,
        enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
        default: 'draft'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
