const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
    const token = getToken();

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
};

// Auth API
export const authAPI = {
    register: (userData) =>
        apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        }),

    login: (credentials) =>
        apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }),

    getMe: () => apiRequest('/auth/me'),
};

// DigiLocker API
export const digilockerAPI = {
    // Get DigiLocker OAuth URL
    getAuthUrl: () => apiRequest('/digilocker/auth-url'),

    // Mock verification (for demo mode)
    mockVerify: (aadhaarNumber) =>
        apiRequest('/digilocker/mock-verify', {
            method: 'POST',
            body: JSON.stringify({ aadhaarNumber })
        }),

    // Get verification status
    getStatus: () => apiRequest('/digilocker/status'),

    // Verify a document
    verifyDocument: (documentData) =>
        apiRequest('/digilocker/verify-document', {
            method: 'POST',
            body: JSON.stringify(documentData)
        }),
};

// Users API
export const usersAPI = {
    getStudents: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/users/students?${queryString}`);
    },

    getUser: (userId) => apiRequest(`/users/${userId}`),

    verifyManual: (userId, data) =>
        apiRequest(`/users/${userId}/verify-manual`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),

    getVerificationQueue: () => apiRequest('/users/admin/verification-queue'),
};

// Exams API
export const examsAPI = {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/exams?${queryString}`);
    },

    create: (examData) =>
        apiRequest('/exams', {
            method: 'POST',
            body: JSON.stringify(examData)
        }),

    publish: (examId) =>
        apiRequest(`/exams/${examId}/publish`, { method: 'PUT' }),

    register: (examId) =>
        apiRequest(`/exams/${examId}/register`, { method: 'POST' }),

    getStudents: (examId) => apiRequest(`/exams/${examId}/students`),
};

// Centers API
export const centersAPI = {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/centers?${queryString}`);
    },

    register: (centerData) =>
        apiRequest('/centers', {
            method: 'POST',
            body: JSON.stringify(centerData)
        }),

    verify: (centerId, data) =>
        apiRequest(`/centers/${centerId}/verify`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),

    getPending: () => apiRequest('/centers/admin/pending'),
};

export default {
    auth: authAPI,
    digilocker: digilockerAPI,
    users: usersAPI,
    exams: examsAPI,
    centers: centersAPI,
};
