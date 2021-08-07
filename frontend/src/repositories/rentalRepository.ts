import { Rental } from '../types';
import axios from 'axios';

const craftUrl = (group_id: number) => `${process.env.REACT_APP_API_ENDPOINT}/groups/${group_id}/rentals`;

export const getRentals = async(group_id: number): Promise<Rental[]> => {
    const res = await axios.get(craftUrl(group_id));
    return res.data;
}