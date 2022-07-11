import { Request, Response } from 'express';
import getAll from '../services/matchesService';

const getMatches = async (req:Request, res:Response) => {
  try {
    const matches = await getAll();
    return res.status(200).json(matches);
  } catch (error) {
    console.log(error);
  }
};

export default getMatches;
