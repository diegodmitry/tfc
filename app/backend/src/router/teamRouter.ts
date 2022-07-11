import { Router } from 'express';
import { getAllTeamsList, getTeamById } from '../controllers/teamController';

const teamRouter = Router();

// Req 15
teamRouter.get('/teams', getAllTeamsList);

// Req 16
teamRouter.get('/teams/:id', getTeamById);

export default teamRouter;
