import { Router } from 'express';
import getMatches from '../controllers/matchesController';

const matchesRoute = Router();

matchesRoute.get('/matches', getMatches);

export default matchesRoute;
