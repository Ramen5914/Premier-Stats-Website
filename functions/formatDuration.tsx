export default function formatDuration(duration: string): string {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

    const match = RegExp(regex).exec(duration);

    if (match == null) {
        throw new Error(`RegEx match not found in ${duration}`);
    }

    let h: number = parseInt(match[1]);
    let hours: string;
    let m: number = parseInt(match[2]);
    let minutes: string;
    let s: number = parseInt(match[3]);
    let seconds: string;

    if (Number.isNaN(h) || h == 0) {
        hours = "";
    } else {
        if (h.toString().length > 2) {
            throw new Error("Hours in duration is too long.");
        } else if (h.toString().length == 2) {
            hours = `${h}h `;
        } else {
            hours = `0${h}h `;
        }
    }

    if (Number.isNaN(m) || m == 0) {
        minutes = "00m ";
    } else {
        if (m.toString().length > 2) {
            throw new Error("Minutes in duration is too long.");
        } else if (m.toString().length == 2) {
            minutes = `${m}m `;
        } else {
            minutes = `0${m}m `;
        }
    }

    if (Number.isNaN(s) || s == 0) {
        seconds = "00s";
    } else {
        if (s.toString().length > 2) {
            throw new Error("Seconds in duration is too long.");
        } else if (m.toString().length == 2) {
            seconds = `${s}s`;
        } else {
            seconds = `0${s}s`;
        }
    }

    return `${hours}${minutes}${seconds}`;
}
