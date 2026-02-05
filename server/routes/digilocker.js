import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * DigiLocker Integration
 * 
 * NOTE: For PRODUCTION, you need to:
 * 1. Register at https://partners.digitallocker.gov.in/
 * 2. Get approved as a "Requester" organization
 * 3. Obtain client_id and client_secret
 * 4. Use the actual DigiLocker OAuth endpoints
 * 
 * This implementation includes:
 * - Mock mode for development/demo
 * - Real DigiLocker OAuth flow structure
 */

const DIGILOCKER_CONFIG = {
    authUrl: 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize',
    tokenUrl: 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/token',
    aadhaarEkycUrl: 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/xml/ekyc',
    clientId: process.env.DIGILOCKER_CLIENT_ID,
    clientSecret: process.env.DIGILOCKER_CLIENT_SECRET,
    redirectUri: process.env.DIGILOCKER_REDIRECT_URI
};

// Store temporary state tokens (use Redis in production)
const stateTokens = new Map();

// @route   GET /api/digilocker/auth-url
// @desc    Get DigiLocker OAuth authorization URL
// @access  Private
router.get('/auth-url', protect, async (req, res) => {
    try {
        // Generate unique state token
        const state = `${req.user._id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Store state with user ID (expires in 10 minutes)
        stateTokens.set(state, {
            userId: req.user._id.toString(),
            createdAt: Date.now(),
            expiresAt: Date.now() + 10 * 60 * 1000
        });

        // For development/demo mode
        if (!DIGILOCKER_CONFIG.clientId || DIGILOCKER_CONFIG.clientId === 'your_digilocker_client_id') {
            return res.json({
                success: true,
                mode: 'demo',
                message: 'DigiLocker is running in demo mode. Use the mock verification endpoint.',
                demoUrl: `${process.env.FRONTEND_URL}/digilocker-demo?state=${state}`,
                state
            });
        }

        // Real DigiLocker OAuth URL
        const authUrl = new URL(DIGILOCKER_CONFIG.authUrl);
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('client_id', DIGILOCKER_CONFIG.clientId);
        authUrl.searchParams.append('redirect_uri', DIGILOCKER_CONFIG.redirectUri);
        authUrl.searchParams.append('state', state);
        authUrl.searchParams.append('scope', 'openid');

        res.json({
            success: true,
            mode: 'production',
            authUrl: authUrl.toString(),
            state
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate auth URL',
            error: error.message
        });
    }
});

// @route   GET /api/digilocker/callback
// @desc    Handle DigiLocker OAuth callback
// @access  Public (redirected from DigiLocker)
router.get('/callback', async (req, res) => {
    try {
        const { code, state, error } = req.query;

        if (error) {
            return res.redirect(`${process.env.FRONTEND_URL}/verification-failed?error=${error}`);
        }

        // Verify state token
        const storedState = stateTokens.get(state);
        if (!storedState || storedState.expiresAt < Date.now()) {
            return res.redirect(`${process.env.FRONTEND_URL}/verification-failed?error=invalid_state`);
        }

        const userId = storedState.userId;
        stateTokens.delete(state);

        // Exchange code for access token (in production)
        // const tokenResponse = await axios.post(DIGILOCKER_CONFIG.tokenUrl, {...});

        // Fetch Aadhaar eKYC data (in production)
        // const ekycResponse = await axios.get(DIGILOCKER_CONFIG.aadhaarEkycUrl, {...});

        // For now, redirect to success page
        res.redirect(`${process.env.FRONTEND_URL}/verification-success?userId=${userId}`);
    } catch (error) {
        console.error('DigiLocker callback error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/verification-failed?error=callback_error`);
    }
});

// @route   POST /api/digilocker/mock-verify
// @desc    Mock DigiLocker verification for demo/development
// @access  Private
router.post('/mock-verify', protect, async (req, res) => {
    try {
        const { aadhaarNumber } = req.body;

        if (!aadhaarNumber || aadhaarNumber.length !== 12) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid 12-digit Aadhaar number'
            });
        }

        // Simulate DigiLocker verification with mock data
        const mockAadhaarData = {
            verified: true,
            name: req.user.name,
            dob: '1998-05-15',
            gender: 'Male',
            maskedNumber: `XXXX-XXXX-${aadhaarNumber.slice(-4)}`,
            address: {
                house: '123',
                street: 'Main Street',
                locality: 'Central Area',
                district: 'Sample District',
                state: 'Sample State',
                pincode: '110001'
            },
            photo: null,  // Would contain base64 photo from actual DigiLocker
            verifiedAt: new Date()
        };

        // Update user with DigiLocker data
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                digilockerVerified: true,
                'digilockerData.aadhaar': mockAadhaarData
            },
            { new: true }
        );

        res.json({
            success: true,
            message: '✅ Aadhaar verified successfully via DigiLocker!',
            mode: 'demo',
            verification: {
                name: mockAadhaarData.name,
                maskedAadhaar: mockAadhaarData.maskedNumber,
                verifiedAt: mockAadhaarData.verifiedAt
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

// @route   POST /api/digilocker/verify-document
// @desc    Verify a specific document from DigiLocker
// @access  Private
router.post('/verify-document', protect, async (req, res) => {
    try {
        const { documentType, accessToken, documentUri } = req.body;

        // In production, fetch document from DigiLocker API
        // const docResponse = await axios.get(documentUri, { headers: { Authorization: `Bearer ${accessToken}` } });

        // Mock document verification
        const mockDocument = {
            type: documentType,
            issuer: documentType.includes('10th') ? 'CBSE' : documentType.includes('12th') ? 'CBSE' : 'Unknown',
            documentId: `DOC-${Date.now()}`,
            verifiedAt: new Date(),
            data: {
                studentName: req.user.name,
                rollNumber: 'DEMO123456',
                yearOfPassing: '2020',
                percentage: '85%'
            }
        };

        // Add document to user's verified documents
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { 'digilockerData.documents': mockDocument }
            }
        );

        res.json({
            success: true,
            message: `${documentType} verified successfully`,
            document: mockDocument
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Document verification failed',
            error: error.message
        });
    }
});

// @route   GET /api/digilocker/status
// @desc    Get current user's DigiLocker verification status
// @access  Private
router.get('/status', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('digilockerVerified digilockerData manualDocuments');

        res.json({
            success: true,
            verification: {
                digilockerVerified: user.digilockerVerified,
                aadhaarVerified: user.digilockerData?.aadhaar?.verified || false,
                panVerified: user.digilockerData?.pan?.verified || false,
                documentsCount: user.digilockerData?.documents?.length || 0,
                manualVerified: user.manualDocuments?.verified || false,
                aadhaarMasked: user.digilockerData?.aadhaar?.maskedNumber || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch verification status',
            error: error.message
        });
    }
});

// Clean up expired state tokens periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of stateTokens) {
        if (value.expiresAt < now) {
            stateTokens.delete(key);
        }
    }
}, 60 * 1000); // Every minute

export default router;
