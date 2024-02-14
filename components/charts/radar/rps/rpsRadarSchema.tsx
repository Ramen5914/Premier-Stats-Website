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

export type PlayerMatch = z.infer<typeof playerMatch>;
