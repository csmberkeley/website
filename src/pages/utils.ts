/**
 * Returns a URL for a Google Drive image that can be embedded in an img tag.
 * The argument should be a URL of the form
 * https://drive.google.com/open?id=[id]
 * See https://stackoverflow.com/questions/10311092/
 */
export function getEmbeddableDriveImageLink(url: string): string {
    let chunks = url.split("id=");
    if (chunks.length < 2) {
        return "ERROR";
    }
    let id = chunks[1];
    return `https://docs.google.com/uc?id=${id}`;
}
