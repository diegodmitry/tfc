import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

const getMatches = async (req:Request, res:Response) => {
  try {
    const matches = await matchesService.getAll();
    return res.status(200).json(matches);
  } catch (error) {
    console.log(error);
  }
};

// Req 23
const createMatches = async (req:Request, res:Response) => {
  try {
    const match = await matchesService.create(req.body);
    return res.status(201).json(match);
  } catch (error) {
    console.log(error);
  }
};

// Req 24
const updateStatusInProgress = async (req:Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await matchesService.updateStatusInProgress(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export default { getMatches, createMatches, updateStatusInProgress };
