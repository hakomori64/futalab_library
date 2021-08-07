import { Book } from '../types';
import axios from 'axios';

const craftUrl = (group_id: number) => `${process.env.REACT_APP_API_ENDPOINT}/groups/${group_id}/books`;

export const getBooks = async (group_id: number) : Promise<Book[]> => {
    const res = await axios.get(craftUrl(group_id));
    return res.data;
}

export const updateBook = async (group_id: number, book_id: number, data: {
    title: string,
    isbn: string,
    quantity: number,
    cover_image_url: string,
}) : Promise<void> => {
    const res = await axios.put(`${craftUrl(group_id)}/${book_id}`, data);
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
            throw Error('something went wrong while updating book information');
    };
}