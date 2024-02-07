const BEZIER_PRECISION = 4;

const PLACEMENT_W = 50;
const TRACKER_NETWORK_W = 250;
const COMBAT_SCORE_W = 0;
const KILLS_W = 0;
const DEATHS_W = 0;
const ASSISTS_W = 0;
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

    place: number,
    tns: number,
    acs: number,
    k: number,
    d: number,
    a: number,
    dd: number,
    adr: number,
    hs: number,
    kast: number,
    fk: number,
    fd: number,
    multies: number,
): number {


}

function modifiedBezier(input: number, minVal: number, maxVal: number, weight: number) {
    let x = (Math.min(Math.max(input, minVal), maxVal) - minVal) / (maxVal - minVal);

    return (Math.round((-2 * Math.pow(((Math.cbrt(Math.sqrt(5) * Math.sqrt(320 * Math.pow(x, 2) - 320 * x + 81) + 40 * x - 20)) / (2 * Math.pow(5, (2/3)))) - (1/(2 * Math.cbrt(5) * Math.cbrt(Math.sqrt(5) * Math.sqrt(320 * Math.pow(x, 2) - 320 * x + 81) + 40 * x - 20))) + (1/2), 3) + 3 * Math.pow(((Math.cbrt(Math.sqrt(5) * Math.sqrt(320 * Math.pow(x, 2) - 320 * x + 81) + 40 * x - 20)) / (2 * Math.pow(5, (2/3)))) - (1/(2 * Math.cbrt(5) * Math.cbrt(Math.sqrt(5) * Math.sqrt(320 * Math.pow(x, 2) - 320 * x + 81) + 40 * x - 20))) + (1/2), 2)) * (Math.pow(10, BEZIER_PRECISION))) / (Math.pow(10, BEZIER_PRECISION))) * weight;
}
