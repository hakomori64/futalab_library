import axios from 'axios';

const craftUrl = () => `${process.env.REACT_APP_API_ENDPOINT}/photos`;

export const uploadPhoto = async (image: FormData) : Promise<{ cover_image_url: string }> => {
    const res = await axios.post(craftUrl(), image);
    return res.data;
}