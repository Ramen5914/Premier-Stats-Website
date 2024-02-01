import { z } from "zod";

export const tournamentTeam = z.object({
  id: z.number(),
  tournamentId: z.number(),

  createdAt: z.string(),
  lastModifiedAt: z.string(),

  name: z.string(),
  tag: z.string(),
  rank: z.number(),
  link: z.string(),
  imageLink: z.string(),
});
export const tournamentGame = z.object({
  id: z.number(),
  tournamentId: z.number(),

  createdAt: z.string(),
  lastModifiedAt: z.string(),

  playedAt: z.string(),
  duration: z.string(),

  team1: tournamentTeam,
  team1Score: z.number(),

  team2: tournamentTeam,
  team2Score: z.number(),
});
export const tournament = z.object({
  id: z.number(),
  teamId: z.number(),

  createdAt: z.string(),
  lastModifiedAt: z.string(),

  datePlayedAt: z.string(),

  tournamentGames: z.array(tournamentGame),
  tournamentTeams: z.array(tournamentTeam),
});
export const agent = z.enum([
  "Astra",
  "Breach",
  "Brimstone",
  "Chamber",
  "Cypher",
  "Deadlock",
  "Fade",
  "Gekko",
  "Harbor",
  "Iso",
  "Jett",
  "KAY_O",
  "Killjoy",
  "Neon",
  "Omen",
  "Phoenix",
  "Raze",
  "Reyna",
  "Sage",
  "Skye",
  "Sova",
  "Viper",
  "Yoru",
]);
export const mvp = z.enum(["None", "Team MVP", "Match MVP"]);
export const playerMatch = z.object({
  id: z.number(),
  playerId: z.number(),
  teamMatchId: z.number(),

  createdAt: z.string(),
  lastModifiedAt: z.string(),

  agent: agent,
  mvp: mvp,
  placement: z.number(),
  trackerNetworkScore: z.number(),
  averageCombatScore: z.number(),
  kills: z.number(),
  deaths: z.number(),
  assists: z.number(),
  killDeathRatio: z.number(),
  plusMinus: z.number(),
  damageDelta: z.number(),
  averageDamagePerRound: z.number(),
  headshotPercentage: z.number(),
  killedAssistedSurvivedTraded: z.number(),
  firstKills: z.number(),
  firstDeaths: z.number(),
  threeK: z.number(),
  fourK: z.number(),
  fiveK: z.number(),
  sixK: z.number(),
  multies: z.number(),
});
export const rank = z.enum([
  "Unranked",
  "Iron 1",
  "Iron 2",
  "Iron 3",
  "Bronze 1",
  "Bronze 2",
  "Bronze 3",
  "Silver 1",
  "Silver 2",
  "Silver 3",
  "Gold 1",
  "Gold 2",
  "Gold 3",
  "Platinum 1",
  "Platinum 2",
  "Platinum 3",
  "Diamond 1",
  "Diamond 2",
  "Diamond 3",
  "Ascendant 1",
  "Ascendant 2",
  "Ascendant 3",
  "Immortal 1",
  "Immortal 2",
  "Immortal 3",
  "Radiant",
]);
export const role = z.enum([
  "Captain",
  "Co-Captain",
  "Member",
  "Substitute",
  "Ex-Member",
]);
export const player = z.object({
  id: z.number(),
  teamId: z.number(),

  createdAt: z.string(),
  lastModifiedAt: z.string(),

  displayName: z.string(),
  name: z.string(),
  tag: z.string(),
  currentRank: rank,
  peakRank: rank,
  link: z.string(),
  imageLink: z.string(),
  role: role,

  playerMatches: z.array(playerMatch),
  playerMatchCount: z.number(),
});
export const map = z.enum([
  "Ascent",
  "Bind",
  "Breeze",
  "Fracture",
  "Haven",
  "Icebox",
  "Lotus",
  "Pearl",
  "Split",
  "Sunset",
]);
export const teamMatch = z.object({
  id: z.number(),
  teamId: z.number(),

  createdAt: z.string(),
  lastModifiedAt: z.string(),

  playedAt: z.string(),
  duration: z.string(),
  practice: z.boolean(),
  map: map,
  enemyName: z.string(),
  enemyTag: z.string(),
  enemyLink: z.string(),
  enemyImageLink: z.string(),
  teamScore: z.number(),
  enemyScore: z.number(),
});
export const division = z.enum([
  "Unranked",
  "Open 1",
  "Open 2",
  "Open 3",
  "Open 4",
  "Open 5",
  "Intermediate 1",
  "Intermediate 2",
  "Intermediate 3",
  "Intermediate 4",
  "Intermediate 5",
  "Advanced 1",
  "Advanced 2",
  "Advanced 3",
  "Advanced 4",
  "Advanced 5",
  "Elite 1",
  "Elite 2",
  "Elite 3",
  "Elite 4",
  "Elite 5",
  "Contender",
]);
export const region = z.enum([
  "US West",
  "US East",
  "Western Europe",
  "Central & Eastern Europe",
  "Middle East",
  "Turkiye",
  "Asia",
  "Japan",
  "Oceania",
  "South Asia",
  "Korea",
  "Latin America North",
  "Latin America South",
  "Brazil",
]);
const record = z.object({
  wins: z.number(),
  losses: z.number(),
});
export const team = z.object({
  id: z.number(),

  createdAt: z.string(),
  lastModifiedAt: z.string(),

  name: z.string(),
  tag: z.string(),
  episode: z.number(),
  act: z.number(),
  division: division,
  score: z.number(),
  record: record,
  roundRecord: record,
  rank: z.number(),
  link: z.string(),
  imageLink: z.string(),
  region: region,

  tournament: tournament,
  players: z.array(player),
  playerCount: z.number(),
  teamMatches: z.array(teamMatch),
  teamMatchCount: z.number(),
});
export const newTeam = z.object({
  name: z.string(),
  tag: z.string(),
  episode: z.number(),
  act: z.number(),
  division: division,
  rank: z.number(),
  link: z.string(),
  imageLink: z.string(),
  region: region,
});
export const teamChange = z.object({
  id: z.number(),

  name: z.string().optional(),
  tag: z.string().optional(),
  episode: z.number().optional(),
  act: z.number().optional(),
  division: division.optional(),
  rank: z.number().optional(),
  link: z.string().optional(),
  imageLink: z.string().optional(),
  region: region.optional(),
});
export const newTeamMatch = z.object({
  teamId: z.number(),

  playedAt: z.string(),
  duration: z.string(),
  practice: z.boolean(),
  map: map,
  enemyName: z.string(),
  enemyTag: z.string(),
  enemyLink: z.string(),
  enemyImageLink: z.string(),
  teamScore: z.number(),
  enemyScore: z.number(),
});
export const teamMatchChange = z.object({
  id: z.number(),
  teamId: z.number().optional(),

  playedAt: z.string().optional(),
  duration: z.string().optional(),
  practice: z.boolean().optional(),
  map: map.optional(),
  enemyName: z.string().optional(),
  enemyTag: z.string().optional(),
  enemyLink: z.string().optional(),
  enemyImageLink: z.string().optional(),
  teamScore: z.number().optional(),
  enemyScore: z.number().optional(),
});
export const newPlayer = z.object({
  teamId: z.number(),

  displayName: z.string(),
  name: z.string(),
  tag: z.string(),
  currentRank: rank,
  peakRank: rank,
  link: z.string(),
  imageLink: z.string(),
  role: role,
});
export const playerChange = z.object({
  id: z.number(),
  teamId: z.number().optional(),

  displayName: z.string().optional(),
  name: z.string().optional(),
  tag: z.string().optional(),
  currentRank: rank.optional(),
  peakRank: rank.optional(),
  link: z.string().optional(),
  imageLink: z.string().optional(),
  role: role.optional(),
});
export const newPlayerMatch = z.object({
  playerId: z.number(),
  teamMatchId: z.number(),

  agent: agent,
  mvp: mvp,
  placement: z.number(),
  trackerNetworkScore: z.number(),
  averageCombatScore: z.number(),
  kills: z.number(),
  deaths: z.number(),
  assists: z.number(),
  damageDelta: z.number(),
  averageDamagePerRound: z.number(),
  headshotPercentage: z.number(),
  killedAssistedSurvivedTraded: z.number(),
  firstKills: z.number(),
  firstDeaths: z.number(),
  threeK: z.number(),
  fourK: z.number(),
  fiveK: z.number(),
  sixK: z.number(),
});
export const playerMatchChange = z.object({
  id: z.number(),
  playerId: z.number().optional(),
  teamMatchId: z.number().optional(),

  agent: agent.optional(),
  mvp: mvp.optional(),
  placement: z.number().optional(),
  trackerNetworkScore: z.number().optional(),
  averageCombatScore: z.number().optional(),
  kills: z.number().optional(),
  deaths: z.number().optional(),
  assists: z.number().optional(),
  damageDelta: z.number().optional(),
  averageDamagePerRound: z.number().optional(),
  headshotPercentage: z.number().optional(),
  killedAssistedSurvivedTraded: z.number().optional(),
  firstKills: z.number().optional(),
  firstDeaths: z.number().optional(),
  threeK: z.number().optional(),
  fourK: z.number().optional(),
  fiveK: z.number().optional(),
  sixK: z.number().optional(),
});
export const newTournament = z.object({
  teamId: z.number(),

  datePlayedAt: z.string(),
});
export const tournamentChange = z.object({
  id: z.number(),
  teamId: z.number().optional(),

  datePlayedAt: z.string().optional(),
});
export const newTournamentGame = z.object({
  tournamentId: z.number(),

  createdAt: z.string(),
  lastModifiedAt: z.string(),

  playedAt: z.string(),
  duration: z.string(),

  team1Id: z.number(),
  team1Score: z.number(),

  team2Id: z.number(),
  team2Score: z.number(),
});
export const tournamentGameChange = z.object({
  id: z.number(),
  tournamentId: z.number().optional(),

  createdAt: z.string().optional(),
  lastModifiedAt: z.string().optional(),

  playedAt: z.string().optional(),
  duration: z.string().optional(),

  team1Id: z.number().optional(),
  team1Score: z.number().optional(),

  team2Id: z.number().optional(),
  team2Score: z.number().optional(),
});
export const newTournamentTeam = z.object({
  tournamentId: z.number(),

  name: z.string(),
  tag: z.string(),
  rank: z.number(),
  link: z.string(),
  imageLink: z.string(),
});
export const tournamentTeamChange = z.object({
  id: z.number(),
  tournamentId: z.number().optional(),

  name: z.string().optional(),
  tag: z.string().optional(),
  rank: z.number().optional(),
  link: z.string().optional(),
  imageLink: z.string().optional(),
});

export type Team = z.infer<typeof team>;
export type NewTeam = z.infer<typeof newTeam>;
export type TeamChange = z.infer<typeof teamChange>;

export type TeamMatch = z.infer<typeof teamMatch>;
export type NewTeamMatch = z.infer<typeof newTeamMatch>;
export type TeamMatchChange = z.infer<typeof teamMatchChange>;

export type Player = z.infer<typeof player>;
export type NewPlayer = z.infer<typeof newPlayer>;
export type PlayerChange = z.infer<typeof playerChange>;

export type PlayerMatch = z.infer<typeof playerMatch>;
export type NewPlayerMatch = z.infer<typeof newPlayerMatch>;
export type PlayerMatchChange = z.infer<typeof playerMatchChange>;

export type Tournament = z.infer<typeof tournament>;
export type NewTournament = z.infer<typeof newTournament>;
export type TournamentChange = z.infer<typeof tournamentChange>;

export type TournamentGame = z.infer<typeof tournamentGame>;
export type NewTournamentGame = z.infer<typeof newTournamentGame>;
export type TournamentGameChange = z.infer<typeof tournamentGameChange>;

export type TournamentTeam = z.infer<typeof tournamentTeam>;
export type NewTournamentTeam = z.infer<typeof newTournamentTeam>;
export type TournamentTeamChange = z.infer<typeof tournamentTeamChange>;
