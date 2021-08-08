import { Return } from '../types';
import axios from 'axios';

const craftUrl = (group_id: number) => `${process.env.REACT_APP_API_ENDPOINT}/groups/${group_id}/returns`;


export const returnBook = async (group_id: number, data: {
    quantity: number,
    group_id: number,
    book_id: number
}) : Promise<Return> => {
    const res = await axios.post(craftUrl(group_id), data);

    switch (res.status) {
        case 201:
            return res.data;
        case 400:
            throw Error('invalid data format');
        case 401:
            throw Error('not authorized');
        case 500:
            throw Error('internal server error');
        default:
            throw Error('something went wrong');
    }
}