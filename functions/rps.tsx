const BEZIER_PRECISION = 4;

const PLACEMENT_W = 50; // 50
const TRACKER_NETWORK_W = 250; // 300
const COMBAT_SCORE_W = 100; // 400
const KDA_W = 150; // 550
const KD_PM_RATIO_W = 50; // 600
const ADR_DD_W = 50; // 650
const HEADSHOT_W = 300; // 950
const KAST_W = 10; // 960
const FIRST_K_D_W = 30; // 990
const MULTI_KILLS_W = 10; // 1000

const THREE_K_W = 1;
const FOUR_K_W = 2;
const FIVE_K_W = 3;
const SIX_K_W = 4;

const KILLS_W = 1;
const DEATHS_W = 1.5;
const ASSISTS_W = 0.5;

const DD_W = 1;

export default function getRPS(
    place: number,
    tns: number,
    acs: number,
    k: number,
    d: number,
    a: number,
    kdRatio: number,
    plusMinus: number,
    dd: number,
    adr: number,
    hs: number,
    kast: number,
    fk: number,
    fd: number,
    threeK: number,
    fourK: number,
    fiveK: number,
    sixK: number,
): number {
    let pScore = 0;

    pScore += headshot(hs);
    pScore += placement(place);
    pScore += trackerNetworkScore(tns);
    pScore += averageCombatScore(acs);
    pScore += killsDeathsAssists(k, d, a);
    pScore += killDeathRatioAndPM(kdRatio, plusMinus);
    pScore += adrAndDamageDelta(adr, dd);
    pScore += killedAssistedSurvivedTraded(kast);
    pScore += firstKillsFirstDeaths(fk, fd);
    pScore += multiKills(threeK, fourK, fiveK, sixK);

    return Math.min(Math.max(Math.round(pScore), 1), 1000);
}

export function headshot(hs: number, chart: boolean = false): number {
    let weight: number = HEADSHOT_W;
    if (chart) {
        weight = 100;
    }

    return modifiedBezier(hs, 10, 30, weight);
}

export function placement(place: number, chart: boolean = false): number {
    if (chart) {
        return 100 - modifiedBezier(place, 1, 10, 100);
    } else {
        return PLACEMENT_W - modifiedBezier(place, 1, 10, PLACEMENT_W);
    }
}

export function trackerNetworkScore(
    tns: number,
    chart: boolean = false,
): number {
    if (chart) {
        return modifiedBezier(tns, 90, 1000, 100);
    } else {
        return modifiedBezier(tns, 90, 1000, TRACKER_NETWORK_W);
    }
}

export function averageCombatScore(
    acs: number,
    chart: boolean = false,
): number {
    if (chart) {
        return modifiedBezier(acs, 75, 250, 100);
    } else {
        return modifiedBezier(acs, 75, 250, COMBAT_SCORE_W);
    }
}

export function killsDeathsAssists(
    k: number,
    d: number,
    a: number,
    chart: boolean = false,
): number {
    if (chart) {
        return modifiedBezier(
            k * KILLS_W - d * DEATHS_W + ASSISTS_W * a,
            -18,
            6.5,
            100,
        );
    } else {
        return modifiedBezier(
            k * KILLS_W - d * DEATHS_W + ASSISTS_W * a,
            -18,
            6.5,
            KDA_W,
        );
    }
}

export function killDeathRatioAndPM(
    kdRatio: number,
    plusMinus: number,
    chart: boolean = false,
): number {
    if (chart) {
        return modifiedBezier(kdRatio + plusMinus, -10, 13, 100);
    } else {
        return modifiedBezier(kdRatio + plusMinus, -10, 13, KD_PM_RATIO_W);
    }
}

export function adrAndDamageDelta(
    adr: number,
    dd: number,
    chart: boolean = false,
): number {
    if (chart) {
        return modifiedBezier(
            adr * modifiedBezier(dd, -50, 50, DD_W),
            0,
            165,
            100,
        );
    } else {
        return modifiedBezier(
            adr * modifiedBezier(dd, -50, 50, DD_W),
            0,
            165,
            ADR_DD_W,
        );
    }
}

export function killedAssistedSurvivedTraded(
    kast: number,
    chart: boolean = false,
): number {
    if (chart) {
        return modifiedBezier(kast, 55, 90, 100);
    } else {
        return modifiedBezier(kast, 55, 90, KAST_W);
    }
}

export function firstKillsFirstDeaths(
    fk: number,
    fd: number,
    chart: boolean = false,
): number {
    if (chart) {
        return modifiedBezier(fk - fd, -2, 2, 100);
    } else {
        return modifiedBezier(fk - fd, -2, 2, FIRST_K_D_W);
    }
}

export function multiKills(
    threeK: number,
    fourK: number,
    fiveK: number,
    sixK: number,
    chart: boolean = false,
): number {
    let weight: number = MULTI_KILLS_W;
    if (chart) {
        weight = 100;
    }
    return modifiedBezier(
        threeK * THREE_K_W +
            fourK * FOUR_K_W +
            fiveK * FIVE_K_W +
            sixK * SIX_K_W,
        0,
        4,
        weight,
    );
}

function modifiedBezier(
    input: number,
    minVal: number,
    maxVal: number,
    weight: number,
) {
    let x =
        (Math.min(Math.max(input, minVal), maxVal) - minVal) /
        (maxVal - minVal);

    return (
        (Math.round(
            (-2 *
                Math.pow(
                    Math.cbrt(
                        Math.sqrt(5) *
                            Math.sqrt(320 * Math.pow(x, 2) - 320 * x + 81) +
                            40 * x -
                            20,
                    ) /
                        (2 * Math.pow(5, 2 / 3)) -
                        1 /
                            (2 *
                                Math.cbrt(5) *
                                Math.cbrt(
                                    Math.sqrt(5) *
                                        Math.sqrt(
                                            320 * Math.pow(x, 2) - 320 * x + 81,
                                        ) +
                                        40 * x -
                                        20,
                                )) +
                        1 / 2,
                    3,
                ) +
                3 *
                    Math.pow(
                        Math.cbrt(
                            Math.sqrt(5) *
                                Math.sqrt(320 * Math.pow(x, 2) - 320 * x + 81) +
                                40 * x -
                                20,
                        ) /
                            (2 * Math.pow(5, 2 / 3)) -
                            1 /
                                (2 *
                                    Math.cbrt(5) *
                                    Math.cbrt(
                                        Math.sqrt(5) *
                                            Math.sqrt(
                                                320 * Math.pow(x, 2) -
                                                    320 * x +
                                                    81,
                                            ) +
                                            40 * x -
                                            20,
                                    )) +
                            1 / 2,
                        2,
                    )) *
                Math.pow(10, BEZIER_PRECISION),
        ) /
            Math.pow(10, BEZIER_PRECISION)) *
        weight
    );
}
