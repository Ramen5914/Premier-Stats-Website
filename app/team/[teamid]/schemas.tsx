import { z } from "zod";

export const tournamentTeam = z.object({   
    id: z.coerce.number(),
    tournamentid: z.coerce.number(),

    createdAt: z.string(),
    lastModifiedAt: z.string(),

    name: z.string(),
    tag: z.string(),
    rank: z.number(),
    link: z.string(),
    imageLink: z.string()
})
export const tournamentGame = z.object({
    id: z.coerce.number(),
    tournamentid: z.coerce.number(),

    createdAt: z.string(),
    lastModifiedAt: z.string(),

    playedAt: z.string(),
    duration: z.string(),

    team1: tournamentTeam,
    team1Score: z.number(),

    team2: tournamentTeam,
    team2Score: z.number()
})
export const tournament = z.object({
    id: z.coerce.number(),
    teamid: z.coerce.number(),

    createdAt: z.string(),
    lastModifiedAt: z.string(),

    datePlayedAt: z.string(),

    tournamentGames: z.array(
        tournamentGame
    ),
    tournamentTeams: z.array(
        tournamentTeam
    )
})
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
    "Yoru"
])
export const mvp = z.enum([
    "None",
    "Team MVP",
    "Match MVP"
])
export const rank = z.enum([
    "Unranked",
    "Iron 1", "Iron 2", "Iron 3",
    "Bronze 1", "Bronze 2", "Bronze 3",
    "Silver 1", "Silver 2", "Silver 3",
    "Gold 1", "Gold 2", "Gold 3",
    "Platinum 1", "Platinum 2", "Platinum 3",
    "Diamond 1", "Diamond 2", "Diamond 3",
    "Ascendant 1", "Ascendant 2", "Ascendant 3",
    "Immortal 1", "Immortal 2", "Immortal 3",
    "Radiant"
])
export const role = z.enum([
    "Captain",
    "Member",
    "Substitute",
    "Ex-Member"
])
export const player = z.object({
    id: z.coerce.number(),
    displayName: z.string(),
    name: z.string(),
    tag: z.string(),
    peakRank: rank,
    imageLink: z.string(),
    role: role,
    playerMatchCount: z.number(),
    teamId: z.coerce.number(),
    title: z.string()
})
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
    "Sunset"
])
export const teamMatch = z.object({
    id: z.coerce.number(),
    playedAt: z.string(),
    duration: z.string(),
    practice: z.boolean(),
    map: map,
    enemyName: z.string(),
    enemyTag: z.string(),
    enemyImageLink: z.string(),
    teamScore: z.number(),
    enemyScore: z.number(),
    teamId: z.number(),
    score: z.number()
})
export const division = z.enum([
    "Unranked",
    "Open 1", "Open 2", "Open 3", "Open 4", "Open 5",
    "Intermediate 1", "Intermediate 2", "Intermediate 3", "Intermediate 4", "Intermediate 5",
    "Advanced 1", "Advanced 2", "Advanced 3", "Advanced 4", "Advanced 5",
    "Elite 1", "Elite 2", "Elite 3", "Elite 4", "Elite 5",
    "Contender"
])
export const region = z.enum([
    "US West", "US East",
    "Western Europe", "Central & Eastern Europe", "Middle East", "Turkiye",
    "Asia", "Japan", "Oceania", "South Asia",
    "Korea",
    "Latin America North", "Latin America South",
    "Brazil"
])
const record = z.object({
    wins: z.number(),
    losses: z.number()
})
export const team = z.object({
    id: z.coerce.number(),
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

    tournament: tournament.optional(),
    players: z.array(
        player
    ),
    teamMatches: z.array(
        teamMatch
    )
})

export type Team = z.infer<typeof team>;
export type TeamMatch = z.infer<typeof teamMatch>;
export type Player = z.infer<typeof player>;
export type Tournament = z.infer<typeof tournament>;
export type TournamentGame = z.infer<typeof tournamentGame>;
export type TournamentTeam = z.infer<typeof tournamentTeam>;
