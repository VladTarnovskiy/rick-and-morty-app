import { ChartersInfo } from '../types/types';
import axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api';

export const getChartersInfo = async (value: string): Promise<ChartersInfo> => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/character/`,
      params: {
        name: `${value}`,
        page: 1,
        // count: 10,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Something went wrong.');
  }
};
