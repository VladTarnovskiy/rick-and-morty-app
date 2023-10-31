import { CharacterInfo } from '../types/types';
import axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api';

export const getCharacterInfo = async (
  value: string,
  page: number
): Promise<CharacterInfo> => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/character/`,
      params: {
        name: `${value}`,
        page: page,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Something went wrong.');
  }
};
