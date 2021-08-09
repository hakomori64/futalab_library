import { Invitation } from '../types';
import axios from 'axios';

const craftUrl = (group_id: number) => `${process.env.REACT_APP_API_ENDPOINT}/groups/${group_id}/invitations`;

export const getInvitations = async (group_id: number): Promise<Invitation[]> => {
    const res = await axios.get(craftUrl(group_id));
    return res.data;
}

export const inviteUser = async (group_id: number, email: string) : Promise<Invitation> => {
    const res = await axios.post(`${craftUrl(group_id)}`, {
        email: email,
        group_id: group_id
    });

    switch (res.status) {
        case 201:
            return res.data;
        case 400:
            throw Error('invalid data format');
        case 401:
            throw Error('not authorized');
        case 500:
            throw Error('internal server error')
        default:
            throw Error('something went wrong while updating book information');
    };
}