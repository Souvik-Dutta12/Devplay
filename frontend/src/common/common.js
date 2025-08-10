export const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past; // difference in milliseconds

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (weeks < 4) return `${weeks}w ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
}
export const formatViews = (views) => {
    if (views === null || views === undefined) return "0";
    if (views < 1000) return views.toString();
    if (views < 1_000_000) return (views / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    if (views < 1_000_000_000) return (views / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
}