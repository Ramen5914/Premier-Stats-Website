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
const FOUR_K_W = 1.5;
const FIVE_K_W = 2;
const SIX_K_W = 2.5;

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

    pScore += modifiedBezier(hs, 10, 30, HEADSHOT_W);
    pScore += PLACEMENT_W - modifiedBezier(place, 1, 10, PLACEMENT_W);
    pScore += modifiedBezier(tns, 90, 900, TRACKER_NETWORK_W);
    pScore += modifiedBezier(acs, 75, 250, COMBAT_SCORE_W);
    pScore += modifiedBezier(
        k * KILLS_W - d * DEATHS_W + ASSISTS_W * a,
        -18,
        6.5,
        KDA_W,
    );
    pScore += modifiedBezier(kdRatio + plusMinus, -10, 13, KD_PM_RATIO_W);
    pScore += modifiedBezier(
        adr * modifiedBezier(dd, -50, 50, DD_W),
        0,
        165,
        ADR_DD_W,
    );
    pScore += modifiedBezier(kast, 55, 90, KAST_W);
    pScore += modifiedBezier(fk - fd, -2, 2, FIRST_K_D_W);
    pScore += modifiedBezier(
        threeK * THREE_K_W +
            fourK * FOUR_K_W +
            fiveK * FIVE_K_W +
            sixK * SIX_K_W,
        0,
        5,
        MULTI_KILLS_W,
    );

    // console.log(
    //     modifiedBezier(
    //         threeK * THREE_K_W +
    //             fourK * FOUR_K_W +
    //             fiveK * FIVE_K_W +
    //             sixK * SIX_K_W,
    //         0,
    //         4, // 4 or 5
    //         MULTI_KILLS_W,
    //     ) / MULTI_KILLS_W
    // )

    return Math.min(Math.max(Math.round(pScore), 1), 1000);
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
