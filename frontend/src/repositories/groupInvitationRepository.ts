import { Invitation } from '../types';
import axios from 'axios';

const craftUrl = (group_id: number) => `${process.env.REACT_APP_API_ENDPOINT}/groups/${group_id}/invitations`;

export const getInvitations = async (group_id: number): Promise<Invitation[]> => {
    const res = await axios.get(craftUrl(group_id));
    return res.data;
}
