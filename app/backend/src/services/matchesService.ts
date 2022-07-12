import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

const getAll = async () => {
  const listMatches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
  });
  return listMatches;
};

export interface IMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean
}

// Req 23
const create = async (obj: IMatch) => {
  const inProgress = true;
  const newMatch = await Matches.create({ ...obj, inProgress });
  return newMatch;
};

// Req 24
const updateStatusInProgress = async (id: string) => {
  await Matches.update({ inProgress: false }, { where: { id } });
  return { message: 'Finished' };
};

// Req 28
const updateScore = async (id: string, matchGoals: object) => {
  const resultUpdated = await Matches.update(matchGoals, { where: { id } });
  return { message: 'Result was updated!', resultUpdated };
};

export default { getAll, create, updateStatusInProgress, updateScore };
