import axios from 'axios';

export const createUserRequest = async (userData) => {
    return await axios.post('http://localhost:4000/users', userData)
}

export const getUsersRequest = async () => {
    return await axios.get('http://localhost:4000/users')
}

export const deleteUserRequest = async (id) => {
    return await axios.delete(`http://localhost:4000/users/${id}`)
}

export const getUserRequest = async (id) => {
    return await axios.get(`http://localhost:4000/users/${id}`)
}

export const updateUserRequest = async (id, newFields) => {
    return await axios.put(`http://localhost:4000/users/${id}`, newFields)
}