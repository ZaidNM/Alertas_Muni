import axios from 'axios';

export const authenticateUserRequest = async (userData) => {
    return await axios.post('http://localhost:4000/auth/user', userData);
};

export const authenticateAdminRequest = async (userData) => {
    return await axios.post('http://localhost:4000/auth/admin', userData);
};

export const authenticateEmailsRequest = async (userData) => {
    return await axios.get('http://localhost:4000/auth/admin/emails', userData);
};