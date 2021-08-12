import { User } from '../types';
import axios from 'axios';

const craftUrl = () => `${process.env.REACT_APP_API_ENDPOINT}/users`;

export const getProfile = async () : Promise<User> => {
    const res = await axios.get(`${craftUrl()}/profile`);
    return res.data;
}

export const updateName = async (name: string) : Promise<void> => {
    const res = await axios.put(`${craftUrl()}/profile`, {
        name: name
    });
    
    switch (res.status) {
        case 200:
            return;
        case 400:
            throw Error('invalid data format');
        case 401:
            throw Error('not authorized');
        case 500:
            throw Error('internal server error')
        default:
            throw Error('something went wrong while updating user name information');
    };
}