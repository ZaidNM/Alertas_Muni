import axios from 'axios';

export const captAdminsRequest = async () => {
    return await axios.get('http://localhost:4000/capt/admin')
}

export const captUsersRequest = async () => {
    return await axios.get('http://localhost:4000/capt/users')
}