import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const leaderboardsRoutes = Router();

// Req 29 e 30
leaderboardsRoutes.get('/leaderboard/home', leaderboardController);

export default leaderboardsRoutes;
