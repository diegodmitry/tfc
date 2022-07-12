import { NextFunction, Request, Response } from 'express';
import { getTeamsById } from '../services/teamService';

const haveTeam = async (req:Request, res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const message = 'There is no team with such id!';
  const getHomeTeam = await getTeamsById(homeTeam);
  const getAwayTeam = await getTeamsById(awayTeam);
  if (getHomeTeam === null || getAwayTeam === null) {
    return res.status(404).json({ message });
  }
  next();
};

export default haveTeam;
