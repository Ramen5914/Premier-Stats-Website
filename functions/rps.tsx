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
