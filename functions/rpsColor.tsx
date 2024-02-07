export default function determineRPSColor(rps: number): string {
    if (rps <= 100) {
        return "bg-rps-100";
    } else if (rps <= 200) {
        return "bg-rps-200";
    } else if (rps <= 300) {
        return "bg-rps-300";
    } else if (rps <= 400) {
        return "bg-rps-400";
    } else if (rps <= 500) {
        return "bg-rps-500";
    } else if (rps <= 600) {
        return "bg-rps-600";
    } else if (rps <= 700) {
        return "bg-rps-700";
    } else if (rps <= 800) {
        return "bg-rps-800";
    } else if (rps <= 900) {
        return "bg-rps-900";
    } else {
        return "bg-rps-1000";
    }
}
