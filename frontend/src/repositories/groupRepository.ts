import { Group } from '../types';
import axios from 'axios';

const craftUrl = () => `${process.env.REACT_APP_API_ENDPOINT}/groups`

export const getGroups = async () : Promise<Group[]> => {
  const res = await axios.get(craftUrl());
  return res.data;
}

export const createGroup = async (data: {name: string}) : Promise<Group> => {
  const res = await axios.post(craftUrl(), data);
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