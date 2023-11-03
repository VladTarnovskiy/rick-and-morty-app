import { Character, CharacterInfo } from '../types/types';
import axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api';

export const getCharactersInfo = async (
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

export const getCharacterInfo = async (id: number): Promise<Character> => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/character/${id}`,
    });
    return response.data;
  } catch (err) {
    throw new Error('Something went wrong.');
  }
};
