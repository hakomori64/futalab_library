import { Group } from '../types';
import axios from 'axios';

const craftUrl = () => `${process.env.REACT_APP_API_ENDPOINT}/groups`

export const getGroups = async () : Promise<Group[]> => {
  const res = await axios.get(craftUrl());
  console.log(res.data);
  return res.data;
} 