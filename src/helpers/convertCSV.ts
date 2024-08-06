import { Book } from '@/types/Book';

export function convertToCSV(data: Book[]): string {
    const csvRows: string[] = [];
    const headers = ['Title', 'Author(s)', 'Cover book', 'First Publish Year', 'Author alternative names', 'ISBNs'];
    csvRows.push(headers.join(';'));
    for (const book of data) {
      const row = [
        book.title,
        book.author_name ? book.author_name.join(', ') : '',
        book.cover_i !== undefined ? `https://covers.openlibrary.org/b/id/${book.cover_i.toString()}` : '',
        book.first_publish_year !== undefined ? book.first_publish_year.toString() : '',
        book.author_alternative_name ? book.author_alternative_name.join(', ') : '',
        book.isbn ? book.isbn.join(', ') : ''
      ];
      csvRows.push(row.join(';'));
    }
    return csvRows.join('\n');
}  