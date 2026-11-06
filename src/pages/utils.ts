/**
 * Returns a URL for a Google Drive image that can be embedded in an img tag.
 * The argument should be a URL of the form
 * https://drive.google.com/thumbnail?id=[id]&sz=w240
 * Old StackOverflow (new 2024 CORS update): https://stackoverflow.com/q/10311092/
 * New StackOverflow: https://stackoverflow.com/q/77803187/
 */
export function getEmbeddableDriveImageLink(url?: string): string {
    if (!url) {
        return "ERROR-blank-url";
    }
    try {
        const parsed = new URL(url);
        const id = parsed.searchParams.get("id") || parsed.pathname.match(/\/file\/d\/([^/]+)/)?.[1];
        if (id) {
            return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w240`;
        }
    } catch {
        // Invalid or missing file links use the image element's placeholder fallback.
    }
    return "ERROR-invalid-drive-url";
}
