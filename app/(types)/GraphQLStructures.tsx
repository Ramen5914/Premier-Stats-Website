export type Team = {
    id: number

    createdAt: string
    lastModifiedAt: string
    name: string
    tag: string
    episode: number
    act: number
    division: Division
    link: string
    imageLink: string
    region: Region
    rank: number
    teamMatches: TeamMatch[]
    players: Player[]
    playerCount: number
}

export type TeamMatch = {
    id: number

    createdAt: string
    lastModifiedAt: string
    playedAt: string
    duration: string
    map: Map
    enemyName: string
    enemyTag: string
    enemyLink: string
    enemyImageLink: string
    teamScore: number
    enemyScore: number
}

export type Player = {
    id: number

    createdAt: string
    lastModifiedAt: string
    displayName: string
    name: string
    tag: string
    currentRank: Rank
    peakRank: Rank
    link: string
    imageLink: string
    role: Role
    playerMatches: PlayerMatch[]
    playerMatchCount: number
}

export type PlayerMatch = {
    id: number

    createdAt: string
    lastModifiedAt: string
    agent: Agent
    mvp: MVP
    placement: number
    trackerNetworkScore: number
    averageCombatScore: number
    kills: number
    deaths: number
    assists: number
    damageDelta: number
    averageDamagePerRound: number
    headshotPercentage: number
    killedAssistedSurvivedTraded: number
    firstKills: number
    firstDeaths: number
    threeK: number
    fourK: number
    fiveK: number
    sixK: number
}

export enum Division {
    Unranked,
    Open_1,
    Open_2,
    Open_3,
    Open_4,
    Open_5,
    numberermediate_1,
    numberermediate_2,
    numberermediate_3,
    numberermediate_4,
    numberermediate_5,
    Advanced_1,
    Advanced_2,
    Advanced_3,
    Advanced_4,
    Advanced_5,
    Elite_1,
    Elite_2,
    Elite_3,
    Elite_4,
    Elite_5,
    Contender
}

export enum Region {
    US_West,
    US_East,
    Western_Europe,
    Central_And_Eastern_Europe,
    Middle_East,
    Turkiye,
    Asia,
    Japan,
    Oceania,
    South_Asia,
    Korea,
    Latin_America_North,
    Latin_America_South,
    Brazil
}

export enum Map {
    Ascent,
    Bind,
    Breeze,
    Fracture,
    Haven,
    Icebox,
    Lotus,
    Pearl,
    Split,
    Sunset
}

export enum Rank {
    Unranked,
    Iron_1,
    Iron_2,
    Iron_3,
    Bronze_1,
    Bronze_2,
    Bronze_3,
    Silver_1,
    Silver_2,
    Silver_3,
    Gold_1,
    Gold_2,
    Gold_3,
    Platinum_1,
    Platinum_2,
    Platinum_3,
    Diamond_1,
    Diamond_2,
    Diamond_3,
    Ascendant_1,
    Ascendant_2,
    Ascendant_3,
    Immortal_1,
    Immortal_2,
    Immortal_3,
    Radiant
}

export enum Role {
    Captain,
    Member,
    Substitute
}

export enum Agent {
    Astra,
    Breach,
    Brimstone,
    Chamber,
    Cypher,
    Deadlock,
    Fade,
    Gekko,
    Harbor,
    Jett,
    KAY_O,
    Killjoy,
    Neon,
    Omen,
    Phoenix,
    Raze,
    Reyna,
    Sage,
    Skye,
    Sova,
    Viper,
    Yoru
}

export enum MVP {
    None,
    Team_MVP,
    Match_MVP
}

export type NewTeam = {
    name: string
    tag: string
    episode: number
    act: number
    division: Division
    link: string
    imageLink: string
    region: Region
}

export type TeamChange = {
    teamId: number

    name: string
    tag: string
    episode: number
    act: number
    division: Division
    link: string
    imageLink: string
    region: Region
}

export type NewPlayer = {
    teamId: number

    displayName: string
    name: string
    tag: string
    currentRank: Rank
    peakRank: Rank
    link: string
    imageLink: string
    role: Role
}

export type PlayerChange = {
    playerId: number

    teamId: number
    displayName: string
    name: string
    tag: string
    currentRank: Rank
    peakRank: Rank
    link: string
    imageLink: string
    role: Role
}

export type NewTeamMatch = {
    teamId: number

    playedAt: string
    duration: string
    map: Map
    enemyName: string
    enemyTag: string
    enemyLink: string
    enemyImageLink: string
    teamScore: number
    enemyScore: number
}

export type TeamMatchChange = {
    teamMatchId: number

    teamId: number
    playedAt: string
    duration: string
    map: Map
    enemyName: string
    enemyTag: string
    enemyLink: string
    enemyImageLink: string
    teamScore: number
    enemyScore: number
}

export type NewPlayerMatch = {
    playerId: number
    teamMatchId: number

    agent: Agent
    mvp: MVP
    placement: number
    trackerNetworkScore: number
    averageCombatScore: number
    kills: number
    deaths: number
    assists: number
    damageDelta: number
    averageDamagePerRound: number
    headshotPercentage: number
    killedAssistedSurvivedTraded: number
    firstKills: number
    firstDeaths: number
    threeK: number
    fourK: number
    fiveK: number
    sixK: number
}

export type PlayerMatchChange = {
    id: number

    playerId: number
    teamMatchId: number

    agent: Agent
    mvp: MVP
    placement: number
    trackerNetworkScore: number
    averageCombatScore: number
    kills: number
    deaths: number
    assists: number
    damageDelta: number
    averageDamagePerRound: number
    headshotPercentage: number
    killedAssistedSurvivedTraded: number
    firstKills: number
    firstDeaths: number
    threeK: number
    fourK: number
    fiveK: number
    sixK: number
}