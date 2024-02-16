import { z } from "zod";

const mvp = z.enum(["None", "Team MVP", "Match MVP"]);

const map = z.enum([
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

const agent = z.enum([
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

const playerMatch = z.object({
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

export const teamMatchSchema = z.object({
    id: z.coerce.number(),
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
    playerMatches: z.array(playerMatch),
});

export type TeamMatchType = z.infer<typeof teamMatchSchema>;
