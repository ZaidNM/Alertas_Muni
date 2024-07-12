import axios from 'axios';

export const createAdminRequest = async (adminData) => {
    return await axios.post('http://localhost:4000/admins', adminData)
}

export const getAdminsRequest = async () => {
    return await axios.get('http://localhost:4000/admins')
}

export const deleteAdminRequest = async (id) => {
    return await axios.delete(`http://localhost:4000/admins/${id}`)
}

export const getAdminRequest = async (id) => {
    return await axios.get(`http://localhost:4000/admins/${id}`)
}

export const updateAdminRequest = async (id, newFields) => {
    return await axios.put(`http://localhost:4000/admins/${id}`, newFields)
}