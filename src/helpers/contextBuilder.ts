import { Book } from '@/types/Book';

export function bookContext(book: Book): string {
    const authors = book.author_name ? book.author_name.join(', ') : 'Unknown authors';
    const authorAlternatives = book.author_alternative_name ? `Author Alternatives: ${book.author_alternative_name.join(', ')}` : '';
    const year = book.first_publish_year ? `Published in ${book.first_publish_year}` : 'Unknown publication year';
    const isbnList = book.isbn ? `ISBN: ${book.isbn.join(', ')}` : 'No ISBN available';
    const contributors = book.contributor ? `Contributors: ${book.contributor.join(', ')}` : '';
    const coverEdition = book.cover_edition_key ? `Cover Edition Key: ${book.cover_edition_key}` : '';
    const ddc = book.ddc ? `DDC: ${book.ddc.join(', ')}` : '';
    const ebookAccess = book.ebook_access ? `Ebook Access: ${book.ebook_access}` : '';
    const ebookCount = book.ebook_count_i ? `Ebook Count: ${book.ebook_count_i}` : '';
    const editionCount = book.edition_count ? `Edition Count: ${book.edition_count}` : '';
    const editionKeys = book.edition_key ? `Edition Keys: ${book.edition_key.join(', ')}` : '';
    const firstSentence = book.first_sentence ? `First Sentence: ${book.first_sentence.join(' ')}` : '';
    const formats = book.format ? `Formats: ${book.format.join(', ')}` : 'Unknown formats';
    const fullText = book.has_fulltext ? `Has Fulltext: ${book.has_fulltext}` : '';
    const iaCollection = book.ia_collection ? `IA Collection: ${book.ia_collection.join(', ')}` : '';
    const iaCollectionS = book.ia_collection_s ? `IA Collection S: ${book.ia_collection_s}` : '';
    const languages = book.language ? `Languages: ${book.language.join(', ')}` : 'Unknown languages';
    const lastModified = book.last_modified_i ? `Last Modified: ${new Date(book.last_modified_i * 1000).toLocaleString()}` : '';
    const pages = book.number_of_pages_median ? `Pages: ${book.number_of_pages_median}` : '';
    const ospCount = book.osp_count ? `OSP Count: ${book.osp_count}` : '';
    const publicScan = book.public_scan_b ? `Public Scan: ${book.public_scan_b}` : '';
    const publishDates = book.publish_date ? `Publish Dates: ${book.publish_date.join(', ')}` : '';
    const publishPlaces = book.publish_place ? `Publish Places: ${book.publish_place.join(', ')}` : '';
    const publishYears = book.publish_year ? `Publish Years: ${book.publish_year.join(', ')}` : '';
    const publishers = book.publisher ? `Publishers: ${book.publisher.join(', ')}` : '';
    const titleSuggest = book.title_suggest ? `Title Suggest: ${book.title_suggest}` : '';
    const titleSort = book.title_sort ? `Title Sort: ${book.title_sort}` : '';
    const bookType = book.type ? `Type: ${book.type}` : '';
    const subjects = book.subject ? `Subjects: ${book.subject.join(', ')}` : 'Unknown subjects';
    const places = book.place ? `Places: ${book.place.join(', ')}` : 'Unknown places';
    const times = book.time ? `Times: ${book.time.join(', ')}` : 'Unknown times';
    const persons = book.person ? `Persons: ${book.person.join(', ')}` : 'Unknown persons';
    const ratingsAverage = book.ratings_average ? `Ratings Average: ${book.ratings_average}` : '';
    const ratingsSortable = book.ratings_sortable ? `Ratings Sortable: ${book.ratings_sortable}` : '';
    const ratingsCount = book.ratings_count ? `Ratings Count: ${book.ratings_count}` : '';
    const ratingsCount1 = book.ratings_count_1 ? `1-Star Ratings: ${book.ratings_count_1}` : '';
    const ratingsCount2 = book.ratings_count_2 ? `2-Star Ratings: ${book.ratings_count_2}` : '';
    const ratingsCount3 = book.ratings_count_3 ? `3-Star Ratings: ${book.ratings_count_3}` : '';
    const ratingsCount4 = book.ratings_count_4 ? `4-Star Ratings: ${book.ratings_count_4}` : '';
    const ratingsCount5 = book.ratings_count_5 ? `5-Star Ratings: ${book.ratings_count_5}` : '';
    const readingLogCount = book.readinglog_count ? `Reading Log Count: ${book.readinglog_count}` : '';
    const wantToReadCount = book.want_to_read_count ? `Want to Read Count: ${book.want_to_read_count}` : '';
    const currentlyReadingCount = book.currently_reading_count ? `Currently Reading Count: ${book.currently_reading_count}` : '';
    const alreadyReadCount = book.already_read_count ? `Already Read Count: ${book.already_read_count}` : '';
    const publisherFacet = book.publisher_facet ? `Publisher Facet: ${book.publisher_facet.join(', ')}` : '';
    const personKey = book.person_key ? `Person Key: ${book.person_key.join(', ')}` : '';
    const timeFacet = book.time_facet ? `Time Facet: ${book.time_facet.join(', ')}` : '';
    const placeKey = book.place_key ? `Place Key: ${book.place_key.join(', ')}` : '';
    const personFacet = book.person_facet ? `Person Facet: ${book.person_facet.join(', ')}` : '';
    const subjectFacet = book.subject_facet ? `Subject Facet: ${book.subject_facet.join(', ')}` : '';
    const subjectKey = book.subject_key ? `Subject Key: ${book.subject_key.join(', ')}` : '';
    const ddcSort = book.ddc_sort ? `DDC Sort: ${book.ddc_sort}` : '';
    const timeKey = book.time_key ? `Time Key: ${book.time_key.join(', ')}` : '';

    return `There is a book and there are details about it: 
            Title: ${book.title}, 
            Authors: ${authors}, 
            ${authorAlternatives}, 
            ${year}, 
            ${isbnList}, 
            ${contributors}, 
            ${coverEdition}, 
            ${ddc}, 
            ${ebookAccess}, 
            ${ebookCount}, 
            ${editionCount}, 
            ${editionKeys}, 
            ${firstSentence}, 
            ${formats}, 
            ${fullText}, 
            ${iaCollection}, 
            ${iaCollectionS}, 
            ${languages}, 
            ${lastModified}, 
            ${pages}, 
            ${ospCount}, 
            ${publicScan}, 
            ${publishDates}, 
            ${publishPlaces}, 
            ${publishYears}, 
            ${publishers}, 
            ${titleSuggest}, 
            ${titleSort}, 
            ${bookType}, 
            ${subjects}, 
            ${places}, 
            ${times}, 
            ${persons}, 
            ${ratingsAverage}, 
            ${ratingsSortable}, 
            ${ratingsCount}, 
            ${ratingsCount1}, 
            ${ratingsCount2}, 
            ${ratingsCount3}, 
            ${ratingsCount4}, 
            ${ratingsCount5}, 
            ${readingLogCount}, 
            ${wantToReadCount}, 
            ${currentlyReadingCount}, 
            ${alreadyReadCount}, 
            ${publisherFacet}, 
            ${personKey}, 
            ${timeFacet}, 
            ${placeKey}, 
            ${personFacet}, 
            ${subjectFacet}, 
            ${subjectKey}, 
            ${ddcSort}, 
            ${timeKey} 
            answer my question:`;
}