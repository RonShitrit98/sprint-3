import { utilService } from "./util.service.js";
import { storageService } from '../../../services/async-storage.service.js';

const BOOKS_KEY = 'books';
const NEW_BOOKS = 'newBooks';
const booksCache = utilService.loadFromStorage(NEW_BOOKS) || {}
_createBooks();

export const bookService = {
  query,
  getBookById,
  addReview,
  deleteReview,
  getEmptyReview,
  getCurrDate,
  getGoogleBook,
  addBook
};

function _setNextPrevBookId(book) {
  return storageService.query(BOOKS_KEY).then(books => {
    const bookIdx = books.findIndex(currBook => currBook.id === book.id)
    book.nextBookId = (books[bookIdx + 1]) ? books[bookIdx + 1].id : books[0].id
    book.prevBookId = (books[bookIdx - 1]) ? books[bookIdx - 1].id : books[books.length - 1].id
    return book
  })
}

function addBook(book) {
  return query()
    .then(books => {
      if (books.some(currBook => currBook.id === book.id)) return 'The book is already in the list'
      else return storageService.post(BOOKS_KEY, book)
    })
}

function getCurrDate() {
  let month = new Date().getMonth()
  month = (month < 10) ? '0' + month : month
  let year = new Date().getFullYear()
  let day = new Date().getDate()
  day = (day < 10) ? '0' + day : day
  return `${year}-${month}-${day}`
}

function getEmptyReview() {
  return {
    id: null,
    name: 'Books Reader',
    rate: null,
    date: getCurrDate(),
    txt: null,
  }
}

function deleteReview(bookId, reviewId) {
  return storageService.get(BOOKS_KEY, bookId)
    .then(book => {
      const idx = book.reviews.findIndex(rev => rev.id === reviewId)
      book.reviews.splice(idx, 1)

      return storageService.put(BOOKS_KEY, book)
    })
    .catch(err => {
      throw err
    })
}

function addReview(bookId, review) {
  return storageService.get(BOOKS_KEY, bookId)
    .then(book => {
      if (!book['reviews']) book['reviews'] = [];
      book.reviews.unshift(review);

      console.log(storageService.put(BOOKS_KEY, book));
      return storageService.put(BOOKS_KEY, book)
    })
    .catch(err => {
      throw err
    })
}

function query() {
  return storageService.query(BOOKS_KEY);
}

function getBookById(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
    .then(book => {
      return _setNextPrevBookId(book)
    })
}

function getGoogleBook(searchKey) {
  if (booksCache[searchKey]) {
    console.log('No need to fetch');
    return Promise.resolve(booksCache[searchKey]);
  }
  return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchKey}`)
    .then(res => res.json())
    .then(res => {
      return res.items.map(book => {
        return {
          id: book.id,
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
          authors: book.volumeInfo.authors,
          publishedDate: book.volumeInfo.publishedDate,
          description: (book.volumeInfo.description) ? book.volumeInfo.description : 'There is no description',
          pageCount: book.volumeInfo.pageCount,
          categories: book.volumeInfo.categories,
          thumbnail: (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : '../../img/test-book.jpg',
          language: book.volumeInfo.language,
          listPrice: {
            amount: utilService.getRandomIntInclusive(10, 200),
            currencyCode: (book.saleInfo.country === 'IL') ? 'ILS' : book.saleInfo.country,
            isOnSale: book.saleInfo.saleabyility
          }
        }
      })
    })
    .then(books => {
      booksCache[searchKey] = books
      utilService.saveToStorage(NEW_BOOKS, booksCache)
      return books
    })
    .catch(err => {
      throw (err + 'Could not find:' + searchKey)
    })
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY);
  if (!books || !books.length) {
    books = [
      {
        "id": "OXeMG8wNskc",
        "title": "metus hendrerit",
        "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
        "authors": [
          "Barbara Cartland"
        ],
        "publishedDate": 1999,
        "description": 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sit doloremque, magni nam cum repellendus at suscipit veniam earum et provident nihil animi ipsa! Ipsum aperiam molestias dolores vero eaque molestiae. Facere veniam deleniti sequi officia nam eveniet et nostrum error dignissimos! Odit corrupti eum repudiandae, laboriosam autem ducimus obcaecati suscipit enim sunt numquam beatae quos omnis doloremque dolorum, aut accusamus officia aliquam, alias fuga reiciendis. Eius praesentium labore modi nisi, nesciunt eos magni quam, repellat, eligendi sint odio ipsam error. Velit porro possimus aut vitae alias deleniti quis, rem sit animi veniam expedita at aspernatur magni nisi libero non, dicta ad quae totam? Fugiat nisi ab est nostrum, sint exercitationem soluta sunt distinctio dolore optio iste inventore debitis vel dignissimos reprehenderit aut explicabo voluptatum reiciendis atque nam. Ullam eligendi nam quae mollitia commodi aliquam nesciunt dignissimos natus laboriosam soluta fugiat maiores molestiae voluptates, quibusdam, recusandae accusamus a sit suscipit..',
        "pageCount": 713,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
        "language": "en",
        "listPrice": {
          "amount": 109,
          "currencyCode": "EUR",
          "isOnSale": false
        }
      },
      {
        "id": "JYOJa2NpSCq",
        "title": "morbi",
        "subtitle": "lorem euismod dictumst inceptos mi",
        "authors": [
          "Barbara Cartland"
        ],
        "publishedDate": 1978,
        "description": "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
        "pageCount": 129,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
        "language": "sp",
        "listPrice": {
          "amount": 44,
          "currencyCode": "EUR",
          "isOnSale": true
        }
      },
      {
        "id": "1y0Oqts35DQ",
        "title": "at viverra venenatis",
        "subtitle": "gravida libero facilisis rhoncus urna etiam",
        "authors": [
          "Dr. Seuss"
        ],
        "publishedDate": 1999,
        "description": "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
        "pageCount": 972,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
        "language": "he",
        "listPrice": {
          "amount": 108,
          "currencyCode": "ILS",
          "isOnSale": false
        }
      },
      {
        "id": "kSnfIJyikTP",
        "title": "dictum",
        "subtitle": "augue eu consectetur class curabitur conubia ligula in ullamcorper",
        "authors": [
          "Danielle Steel"
        ],
        "publishedDate": 1978,
        "description": "interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam",
        "pageCount": 303,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
        "language": "en",
        "listPrice": {
          "amount": 30,
          "currencyCode": "EUR",
          "isOnSale": true
        }
      },
      {
        "id": "f4iuVmbuKCC",
        "title": "sem himenaeos aptent",
        "subtitle": "interdum per habitasse luctus purus est",
        "authors": [
          "Dr. Seuss"
        ],
        "publishedDate": 2011,
        "description": "et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed",
        "pageCount": 337,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
        "language": "sp",
        "listPrice": {
          "amount": 19,
          "currencyCode": "USD",
          "isOnSale": false
        }
      },
      {
        "id": "U2rfZO6oBZf",
        "title": "mi ante posuere",
        "subtitle": "sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus",
        "authors": [
          "Leo Tolstoy"
        ],
        "publishedDate": 1978,
        "description": "senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in",
        "pageCount": 748,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/1.jpg",
        "language": "en",
        "listPrice": {
          "amount": 91,
          "currencyCode": "USD",
          "isOnSale": true
        }
      },
      {
        "id": "xI0wrXaaAcq",
        "title": "non",
        "subtitle": "leo tortor per dapibus mattis ut conubia porttitor ligula viverra",
        "authors": [
          "Leo Tolstoy"
        ],
        "publishedDate": 2011,
        "description": "nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque",
        "pageCount": 65,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
        "language": "he",
        "listPrice": {
          "amount": 90,
          "currencyCode": "USD",
          "isOnSale": false
        }
      },
      {
        "id": "9laHCEdSpFy",
        "title": "tristique",
        "subtitle": "consectetur a eu tincidunt condimentum amet nisi",
        "authors": [
          "Dr. Seuss"
        ],
        "publishedDate": 1999,
        "description": "magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem",
        "pageCount": 299,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/11.jpg",
        "language": "he",
        "listPrice": {
          "amount": 176,
          "currencyCode": "EUR",
          "isOnSale": false
        }
      },
      {
        "id": "nGhVwZvGCGp",
        "title": "urna ornare gravida",
        "subtitle": "sem vestibulum semper convallis pharetra tempor himenaeos ut",
        "authors": [
          "Jin Yong"
        ],
        "publishedDate": 2011,
        "description": "porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla",
        "pageCount": 803,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
        "language": "sp",
        "listPrice": {
          "amount": 116,
          "currencyCode": "USD",
          "isOnSale": true
        }
      },
      {
        "id": "Q8Q9Lsd03BD",
        "title": "consequat neque volutpat",
        "subtitle": "vel quis taciti fermentum feugiat ullamcorper curae praesent",
        "authors": [
          "Dr. Seuss"
        ],
        "publishedDate": 1978,
        "description": "curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare",
        "pageCount": 891,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/5.jpg",
        "language": "en",
        "listPrice": {
          "amount": 145,
          "currencyCode": "EUR",
          "isOnSale": false
        }
      },
      {
        "id": "bd7a76kARao",
        "title": "risus",
        "subtitle": "pretium bibendum pharetra curabitur quisque dictumst",
        "authors": [
          "Danielle Steel"
        ],
        "publishedDate": 2018,
        "description": "auctor amet nostra luctus molestie proin platea cubilia netus sed purus egestas a primis eu tristique interdum litora lorem venenatis mattis senectus",
        "pageCount": 86,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
        "language": "sp",
        "listPrice": {
          "amount": 157,
          "currencyCode": "ILS",
          "isOnSale": true
        }
      },
      {
        "id": "qKyG0vqeO3e",
        "title": "interdum etiam vulputate",
        "subtitle": "velit sapien eget tincidunt nunc tortor",
        "authors": [
          "Danielle Steel"
        ],
        "publishedDate": 2018,
        "description": "aenean mauris porta netus accumsan turpis etiam vestibulum vivamus sagittis nullam nec tellus quam mattis est pellentesque nisi litora sit ad",
        "pageCount": 882,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/17.jpg",
        "language": "sp",
        "listPrice": {
          "amount": 57,
          "currencyCode": "USD",
          "isOnSale": true
        }
      },
      {
        "id": "2RvT48ZNInj",
        "title": "sagittis justo",
        "subtitle": "etiam primis proin praesent placerat nisi fermentum nisi",
        "authors": [
          "Agatha Christie"
        ],
        "publishedDate": 2011,
        "description": "nec faucibus arcu suspendisse tempus potenti lobortis aliquam quisque augue integer consectetur etiam ultrices curabitur tristique metus",
        "pageCount": 598,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/8.jpg",
        "language": "en",
        "listPrice": {
          "amount": 167,
          "currencyCode": "ILS",
          "isOnSale": false
        }
      },
      {
        "id": "5z2s9pDXAYj",
        "title": "quam ullamcorper himenaeos",
        "subtitle": "ut placerat eu dapibus sapien sodales laoreet",
        "authors": [
          "Danielle Steel"
        ],
        "publishedDate": 1999,
        "description": "etiam nec aliquam euismod platea vel laoreet quisque condimentum sapien neque ut aliquam torquent in nam",
        "pageCount": 608,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/3.jpg",
        "language": "he",
        "listPrice": {
          "amount": 150,
          "currencyCode": "USD",
          "isOnSale": true
        }
      },
      {
        "id": "zBZu5cDEWha",
        "title": "quis",
        "subtitle": "suscipit turpis etiam turpis libero lobortis",
        "authors": [
          "Jin Yong"
        ],
        "publishedDate": 2011,
        "description": "etiam pretium urna fusce lobortis curae viverra aptent metus semper nisi litora feugiat elementum purus nunc consequat lorem ultricies non primis phasellus sociosqu donec dolor",
        "pageCount": 583,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/6.jpg",
        "language": "en",
        "listPrice": {
          "amount": 58,
          "currencyCode": "ILS",
          "isOnSale": true
        }
      },
      {
        "id": "aOI7tQuPZ2f",
        "title": "aliquam aliquet dapibus",
        "subtitle": "neque eu purus euismod placerat adipiscing odio egestas consequat",
        "authors": [
          "Leo Tolstoy"
        ],
        "publishedDate": 2011,
        "description": "dolor morbi malesuada eleifend purus taciti sit interdum aliquet commodo ut libero tincidunt",
        "pageCount": 497,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/7.jpg",
        "language": "en",
        "listPrice": {
          "amount": 78,
          "currencyCode": "USD",
          "isOnSale": false
        }
      },
      {
        "id": "WBooB82Uvwu",
        "title": "class",
        "subtitle": "elit enim ultricies amet imperdiet a molestie class elementum venenatis",
        "authors": [
          "Danielle Steel"
        ],
        "publishedDate": 1999,
        "description": "rhoncus odio netus consectetur aenean hendrerit massa scelerisque elementum aptent lobortis pharetra maecenas quam nulla volutpat turpis non habitasse aenean ante sodales lobortis quisque libero imperdiet gravida eleifend nulla",
        "pageCount": 804,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
        "language": "en",
        "listPrice": {
          "amount": 118,
          "currencyCode": "ILS",
          "isOnSale": false
        }
      },
      {
        "id": "xm1z5bbZjlS",
        "title": "vitae",
        "subtitle": "class habitant at commodo semper ligula a bibendum",
        "authors": [
          "Leo Tolstoy"
        ],
        "publishedDate": 1999,
        "description": "himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus",
        "pageCount": 231,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
        "language": "he",
        "listPrice": {
          "amount": 60,
          "currencyCode": "EUR",
          "isOnSale": false
        }
      },
      {
        "id": "u3j6QIKLlJb",
        "title": "rhoncus vivamus",
        "subtitle": "nullam class risus amet senectus scelerisque etiam curabitur",
        "authors": [
          "Agatha Christie"
        ],
        "publishedDate": 1978,
        "description": "torquent in et id lacus vivamus aptent cursus erat integer venenatis risus ac ante quam etiam euismod feugiat risus suscipit rhoncus pharetra quisque felis",
        "pageCount": 652,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
        "language": "he",
        "listPrice": {
          "amount": 110,
          "currencyCode": "USD",
          "isOnSale": true
        }
      },
      {
        "id": "vxYYYdVlEH3",
        "title": "donec mi ullamcorper",
        "subtitle": "varius malesuada augue molestie sollicitudin faucibus mi eu tempus",
        "authors": [
          "William Shakespeare"
        ],
        "publishedDate": 2011,
        "description": "aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed",
        "pageCount": 904,
        "categories": [
          "Computers",
          "Hack"
        ],
        "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
        "language": "sp",
        "listPrice": {
          "amount": 186,
          "currencyCode": "ILS",
          "isOnSale": true
        }
      }
    ];

    utilService.saveToStorage(BOOKS_KEY, books);
  }
  return books;
}

