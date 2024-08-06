export function coverURL(cover?: number, title?: string): string {
    return cover
    ? `https://covers.openlibrary.org/b/id/${cover}-M.jpg`
    : `https://placehold.co/350x500?text=${title}`;
}