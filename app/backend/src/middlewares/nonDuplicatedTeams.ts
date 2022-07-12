import { NextFunction, Request, Response } from 'express';

// Req 25
const nonDuplicatedTeams = async (req:Request, res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const message = 'It is not possible to create a match with two equal teams';
  if (homeTeam === awayTeam) {
    return res.status(401).json({ message });
  }
  next();
};

export default nonDuplicatedTeams;
