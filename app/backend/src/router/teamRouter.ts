import { Router } from 'express';
import { getAllTeamsList, getTeamById } from '../controllers/teamController';

const clubsRoutes = Router();

// Req 15
clubsRoutes.get('/teams', getAllTeamsList);

// Req 16
clubsRoutes.get('/teams/:id', getTeamById);

export default clubsRoutes;
