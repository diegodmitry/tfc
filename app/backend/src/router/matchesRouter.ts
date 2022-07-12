import { Router } from 'express';
import matchesController from '../controllers/matchesController';
import validateToken from '../middlewares/validateToken';
import nonDuplicatedTeams from '../middlewares/nonDuplicatedTeams';
import haveTeam from '../middlewares/haveTeam';

const matchesRoute = Router();

matchesRoute.get('/matches', matchesController.getMatches);

// Req 23
matchesRoute.post(
  '/matches',
  validateToken,
  nonDuplicatedTeams,
  haveTeam,
  matchesController.createMatches,
);

// Req 24
matchesRoute.patch('/matches/:id/finish', matchesController.updateStatusInProgress);

// Req 28
matchesRoute.patch('/matches/:id', matchesController.updateScore);

export default matchesRoute;
