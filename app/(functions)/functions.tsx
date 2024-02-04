export function rps(
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
    for (let i = -30; i < 350; i++) {
        for (let j = -100; j < 500; j++) {
            console.log(`i=${i}, j=${j}: ${kastAdrFunc(i, j)}`)
        }
    }
    // {Name} (Weight / 1000)
    let finalRPS: number = 0;

    // Placement (50) -> 50
    if (place <= 3) {
        finalRPS += 50;
    } else if (place <= 6) {
        finalRPS += 25;
    }

    // Tracker Score (50) -> 100
    if (tns >= 800) {
        finalRPS += 5;
    } else if (tns >= 200) {
        finalRPS += (1 / 12) * (tns - 200);
    }

    // KDA (100) -> 200
    if (k - d + a / 3 > 12) {
        finalRPS += 100;
    } else {
        finalRPS += (25 / 3) * (k - d + a / 3);
    }

    // ACS (50) -> 250
    if (acs >= 320) {
        finalRPS += 50;
    } else {
        finalRPS += (5 / 24) * (acs - 80);
    }

    // Headshot (200) -> 450
    if (35 <= hs) {
        finalRPS += 200;
    } else if (30 <= hs) {
        finalRPS += 5 * (hs - 30) + 175;
    } else if (20 <= hs) {
        finalRPS += 9.5 * (hs - 20) + 80;
    } else {
        finalRPS += 4 * hs;
    }

    // Damage Delta (50) -> 500
    finalRPS += ddFunc(dd) * 50;
    // KAST x ADR (150) -> 650
    finalRPS += kastAdrFunc(adr, kast) * 150;

    return Math.ceil(finalRPS);
}

function ddFunc(x: number) {
    if (x > 75) {
        return 1;
    } else if (x < -30) {
        return 0;
    } else {
        return (1 / 105) * (x + 30);
    }
}

function kastAdrFunc(adr: number, kast: number) {
    return ((2 * adrFunc(adr)) + kastFunc(kast)) / 3;
}

function adrFunc(x: number) {
    if (x > 200) {
        return 1;
    } else if (x > 125 && x <= 200) {
        return (3 / 500) * (x - 125) + 0.55;
    } else if (x > 50 && x <= 125) {
        return (3 / 1500) * (x - 50) + 0.4;
    } else if (x > 0 && x <= 50) {
        return (1 / 125) * x;
    } else {
        return 0;
    }
}

function kastFunc(x: number) {
    if (x > 80) {
        return 1;
    } else if (x > 70 && x <= 80) {
        return (1 / 40) * (x - 70) + 0.75;
    } else if (x > 55 && x <= 70) {
        return (13 / 300) * (x - 55) + 0.1;
    } else if (x > 0 && x <= 55) {
        return x / 125;
    } else {
        return 0;
    }
}
