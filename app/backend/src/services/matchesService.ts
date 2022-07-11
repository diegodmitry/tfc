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

export default getAll;
