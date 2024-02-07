const BEZIER_PRECISION = 4;

const PLACEMENT_W = 50;
const TRACKER_NETWORK_W = 250;
const COMBAT_SCORE_W = 100;
const KD_RATIO_W = 0;
const PLUS_MINUS_W = 0;
const DAMAGE_DELTA_W = 0;
const AVERAGE_DAMAGE_W = 0;
const HEADSHOT_W = 500;
const KAST_W = 0;
const FIRST_KILLS_W = 0;
const FIRST_DEATHS_W = 0;
const MULTI_KILLS_W = 0;

const THREE_K_W = 0;
const FOUR_K_W = 0;
const FIVE_K_W = 0;
const SIX_K_W = 0;

const KDA_W = 0;
const KILLS_W = 1;
const DEATHS_W = 1.5;
const ASSISTS_W = 0.5;

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
    multies: number,
): number {
    let pScore = 0;

    pScore += modifiedBezier(hs, 15, 30, HEADSHOT_W);
    pScore += modifiedBezier(place, 10, 1, PLACEMENT_W);
    pScore += modifiedBezier(tns, 90, 900, TRACKER_NETWORK_W);
    pScore += modifiedBezier(acs, 75, 250, COMBAT_SCORE_W);
    pScore += modifiedBezier((k * KILLS_W - d * DEATHS_W) + (ASSISTS_W * a), 0, 0, KDA_W);

    return Math.round(pScore);
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
