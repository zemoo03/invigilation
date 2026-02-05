import mongoose from 'mongoose';

const centerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Center name is required'],
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    address: {
        street: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: String
    },

    capacity: {
        type: Number,
        required: true,
        default: 50
    },

    facilities: [String],  // e.g., ['AC', 'CCTV', 'Biometric']

    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    contactEmail: String,
    contactPhone: String,

    isActive: {
        type: Boolean,
        default: true
    },

    verificationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    verifiedAt: Date
}, {
    timestamps: true
});

const Center = mongoose.model('Center', centerSchema);

export default Center;
