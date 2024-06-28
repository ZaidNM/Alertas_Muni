import axios from 'axios';

export const captAdminsRequest = async (adminData) => {
    return await axios.get('http://localhost:4000/capt/admin', adminData)
}

export const captUsersRequest = async () => {
    return await axios.get('http://localhost:4000/capt/users')
}