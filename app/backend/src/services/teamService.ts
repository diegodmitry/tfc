import Teams from '../database/models/teams';

// Req 15
export const getAllTeams = async () => {
  const teamsList = await Teams.findAll();
  return teamsList;
};

// Req 16
export const getTeamsById = async (id: string) => {
  const team = await Teams.findOne({ where: { id } });
  return team;
};