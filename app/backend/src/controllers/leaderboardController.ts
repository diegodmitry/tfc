import { Request, Response } from 'express';
import { compareHomeStats } from '../services/leaderboardsService';

// Req 29 e 30
const homeLeaderboards = async (_req: Request, res: Response) => {
  const result = await compareHomeStats();
  return res.status(200).json(result);
};

export default homeLeaderboards;
