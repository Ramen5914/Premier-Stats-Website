// Team
export type Team = {
    id?: number

    createdAt?: string
    lastModifiedAt?: string

    name?: string
    tag?: string
    episode?: number
    act?: number
    division?: string
    score?: number
    record?: Record
    roundRecord?: Record
    rank?: number
    link?: string
    imageLink?: string
    region?: string

    tournament?: Tournament
    players?: Player[]
    playerCount?: number
    teamMatches?: TeamMatch[]
    teamMatchCount?: number
}
export type NewTeam = {
    name: string
    tag: string
    episode: number
    act: number
    division: string
    rank: number
    link: string
    imageLink: string
    region: string
}
export type TeamChange = {
    id: number

    name?: string
    tag?: string 
    episode?: number
    act?: number
    division?: string
    rank?: number
    link?: string
    imageLink?: string
    region?: string
}

// Team Match
export type TeamMatch = {
    id?: number
    teamId?: number

    createdAt?: string
    lastModifiedAt?: string

    playedAt?: string
    duration?: string
    practice?: boolean
    map?: string
    enemyName?: string
    enemyTag?: string
    enemyLink?: string
    enemyImageLink?: string
    teamScore?: number
    enemyScore?: number
    score?: number
}
export type NewTeamMatch = {
    teamId: number

    playedAt: string
    duration: string
    practice: boolean
    map: string
    enemyName: string
    enemyTag: string
    enemyLink: string
    enemyImageLink: string
    teamScore: number
    enemyScore: number
}
export type TeamMatchChange = {
    id: number
    teamId?: number

    playedAt?: string
    duration?: string
    practice?: boolean
    map?: string
    enemyName?: string
    enemyTag?: string
    enemyLink?: string
    enemyImageLink?: string
    teamScore?: number
    enemyScore?: number
}

// Player
export type Player = {
    id?: number
    teamId?: number

    createdAt?: string
    lastModifiedAt?: string

    displayName?: string
    name?: string
    tag?: string
    currentRank?: string
    peakRank?: string
    link?: string
    imageLink?: string
    role?: string
    quote?: string
    title?: string

    playerMatches?: PlayerMatch[]
    playerMatchCount?: number
}
export type NewPlayer = {
    teamId: number

    displayName: string
    name: string
    tag: string
    currentRank: string
    peakRank: string
    link: string
    imageLink: string
    role: string
    quote: string
    title: string
}
export type PlayerChange = {
    id: number
    teamId?: number

    displayName?: string
    name?: string
    tag?: string
    currentRank?: string
    peakRank?: string
    link?: string
    imageLink?: string
    role?: string
    quote?: string
    title?: string
}

// Player Match
export type PlayerMatch = {
    id?: number
    playerId?: number
    teamMatchId?: number

    createdAt?: string
    lastModifiedAt?: string

    agent?: string
    mvp?: string
    placement?: number
    trackerNetworkScore?: number
    averageCombatScore?: number
    kills?: number
    deaths?: number
    assists?: number
    killDeathRatio?: number
    plusMinus?: number
    damageDelta?: number
    averageDamagePerRound?: number
    headshotPercentage?: number
    killedAssistedSurvivedTraded?: number
    firstKills?: number
    firstDeaths?: number
    threeK?: number
    fourK?: number
    fiveK?: number
    sixK?: number
    multies?: number
}
export type NewPlayerMatch = {
    playerId: number
    teamMatchId: number

    agent: string
    mvp: string
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
    playerId?: number
    teamMatchId?: number

    agent?: string
    mvp?: string
    placement?: number
    trackerNetworkScore?: number
    averageCombatScore?: number
    kills?: number
    deaths?: number
    assists?: number
    damageDelta?: number
    averageDamagePerRound?: number
    headshotPercentage?: number
    killedAssistedSurvivedTraded?: number
    firstKills?: number
    firstDeaths?: number
    threeK?: number
    fourK?: number
    fiveK?: number
    sixK?: number
}

// Tournament
export type Tournament = {
    id?: number
    teamId?: number

    createdAt?: string
    lastModifiedAt?: string

    datePlayedAt?: string

    tournamentGames?: TournamentGame[]
    tournamentTeams?: TournamentTeam[]
}
export type NewTournament = {
    teamId: number

    datePlayedAt: string
}
export type TournamentChange = {
    id: number
    teamId?: number

    datePlayedAt?: string
}

// Tournament Game 
export type TournamentGame = {
    id?: number
    tournamentId?: number

    createdAt?: string
    lastModifiedAt?: string

    playedAt?: string
    duration?: string

    team1?: TournamentTeam
    team1Score?: number

    team2?: TournamentTeam
    team2Score?: number
}
export type NewTournamentGame = {
    tournamentId: number

    createdAt: string
    lastModifiedAt: string

    playedAt: string
    duration: string

    team1Id: number
    team1Score: number

    team2Id: number
    team2Score: number
}
export type TournamentGameChange = {
    id: number
    tournamentId?: number

    createdAt?: string
    lastModifiedAt?: string

    playedAt?: string
    duration?: string

    team1Id?: number
    team1Score?: number

    team2Id?: number
    team2Score?: number
}

// Tournament Team
export type TournamentTeam = {   
    id?: number
    tournamentId?: number

    createdAt?: string
    lastModifiedAt?: string

    name?: string
    tag?: string
    rank?: string
    link?: string
    imageLink?: string
}
export type NewTournamentTeam = {
    tournamentId: number

    name: string
    tag: string
    rank: string
    link: string
    imageLink: string
}
export type TournamentTeamChange = {
    id: number
    tournamentId?: number

    name?: string
    tag?: string
    rank?: string
    link?: string
    imageLink?: string
}

type Record = { 
    wins?: number
    losses?: number
}