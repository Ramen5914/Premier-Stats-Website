import { z } from "zod";

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
export const playerMatchType = z.object({
    id: z.coerce.number(),
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
    killedAssistedSurvivedTraded: z.number(),
    headshotPercentage: z.number(),
    firstKills: z.number(),
    firstDeaths: z.number(),
    threeK: z.number(),
    fourK: z.number(),
    fiveK: z.number(),
    sixK: z.number(),
    multies: z.number()
})
export const playerSchema = z.object({
    id: z.coerce.number(),
    displayName: z.string(),
    name: z.string(),
    tag: z.string(),
    peakRank: rank,
    imageLink: z.string(),
    role: role,
    playerMatches: z.array(
        playerMatchType
    ),
    playerMatchCount: z.number(),
    teamId: z.coerce.number(),
    title: z.string(),
    quote: z.string()
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
export const teamMatchSchema = z.object({
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

export type TeamMatchType = z.infer<typeof teamMatchSchema>;
export type PlayerType = z.infer<typeof playerSchema>;
export type PlayerMatchType = z.infer<typeof playerMatchType>;
