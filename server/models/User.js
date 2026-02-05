import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['student', 'center', 'admin'],
        default: 'student'
    },
    phone: {
        type: String,
        trim: true
    },

    // DigiLocker Verification Data
    digilockerVerified: {
        type: Boolean,
        default: false
    },
    digilockerData: {
        aadhaar: {
            verified: { type: Boolean, default: false },
            name: String,
            dob: String,
            gender: String,
            maskedNumber: String,  // Last 4 digits only for privacy
            address: {
                house: String,
                street: String,
                locality: String,
                district: String,
                state: String,
                pincode: String
            },
            photo: String,  // Base64 encoded photo from DigiLocker
            verifiedAt: Date
        },
        pan: {
            verified: { type: Boolean, default: false },
            name: String,
            maskedNumber: String,
            verifiedAt: Date
        },
        // Educational documents
        documents: [{
            type: { type: String },  // e.g., '10th Marksheet', '12th Marksheet'
            issuer: String,          // e.g., 'CBSE', 'State Board'
            documentId: String,
            verifiedAt: Date,
            data: mongoose.Schema.Types.Mixed
        }]
    },

    // Manual Document Upload (fallback if DigiLocker not used)
    manualDocuments: {
        aadhaarFront: String,  // File path
        aadhaarBack: String,
        photo: String,
        verified: { type: Boolean, default: false },
        verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        verifiedAt: Date,
        rejectionReason: String
    },

    // Student specific fields
    studentDetails: {
        enrollmentNumber: String,
        institution: String,
        course: String,
        semester: String,
        examCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'Center' }
    },

    // Center specific fields
    centerDetails: {
        centerName: String,
        centerCode: String,
        address: String,
        city: String,
        state: String,
        capacity: Number,
        contactPerson: String,
        contactPhone: String
    },

    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: Date
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Check if user is DigiLocker verified
userSchema.methods.isVerified = function () {
    return this.digilockerVerified || this.manualDocuments?.verified;
};

const User = mongoose.model('User', userSchema);

export default User;
