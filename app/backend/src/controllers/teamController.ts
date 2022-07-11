import { Request, Response } from 'express';
import { getAllTeams, getTeamsById } from '../services/teamService';

// Req 15
export const getAllTeamsList = async (req:Request, res:Response) => {
  const listClubs = await getAllTeams();  
  return res.status(200).json(listClubs);
};

// Req 16
export const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await getTeamsById(id);
  return res.status(200).json(team);
};