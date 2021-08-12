import { Invitation } from '../types';
import axios from 'axios';

const craftUrl = () => `${process.env.REACT_APP_API_ENDPOINT}/invitations`;

export const getInvitations = async (): Promise<Invitation[]> => {
    const res = await axios.get(craftUrl());
    return res.data;
}

export const inviteUser = async (group_id: number, email: string) : Promise<Invitation> => {
    const res = await axios.post(`${craftUrl()}/invite`, {
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
            throw Error('something went wrong while inviting user');
    };
}

export const acceptInvitation = async (invitation_id: number) => {
    const res = await axios.put(`${craftUrl()}/${invitation_id}/accept`);

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
            throw Error('something went wrong while accepting invitation');
    };
}

export const discardInvitation = async (invitation_id: number) => {
    const res = await axios.delete(`${craftUrl()}/${invitation_id}/discard`);

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
            throw Error('something went wrong while discarding invitation');
    };
}