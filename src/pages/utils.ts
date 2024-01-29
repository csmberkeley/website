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
    let chunks = url.split("id=");
    if (chunks.length < 2) {
        return "ERROR-too-few-chunks";
    }
    let id = chunks[1];
    return `https://drive.google.com/thumbnail?id=${id}&sz=w240`;
}
