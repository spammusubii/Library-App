const booksContainer = document.querySelector(".books-container");
const addBookButton = document.querySelector("#add-book-btn");
const addBookModal = document.querySelector("#add-book-modal");

const myLibrary = [
    new Book(crypto.randomUUID(),"Harry Potter", "J. K. Rowling", 123, true),
    new Book(crypto.randomUUID(),"Spiderman", "Stanley", 133, false),
    new Book(crypto.randomUUID(),"Green Eggs and Ham", "Dr. Seuss", 423, true)
];

function Book(id, title, author, pages, read ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title}, written by ${this.author}, is ${this.pages} pages long and has ${this.read ? "" : "not"} been read.`
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

function showLibraryBooks(books){
    myLibrary.forEach(book=>console.log(book.info()));
}

function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    Object.entries(book).forEach(([key, value]) => {
        if (key === "id") return;

        const li = document.createElement("li");

        if (key === "read") {
            const btn = document.createElement('button');
            btn.textContent = value ? "Read" : "Not read";
            if (!value) btn.classList.add("notRead");

            btn.addEventListener("click", (e) => {
                book.read = !book.read;
                btn.textContent = book.read ? "Read" : "Not Read";
                btn.classList.toggle("notRead");
            })

            li.appendChild(btn);
        } else {
            li.textContent = `${key.charAt(0) + key.slice(1)}: ${value}`
        }

        ul.appendChild(li);
    });

    bookCard.appendChild(ul);
    return bookCard;
}

function addBookToDisplay(book){
    const bookCard = createBookCard(book)
    booksContainer.appendChild(bookCard);
}

function displayAllBooks(libraryBooks){
    booksContainer.innerHTML = "";
    libraryBooks.forEach(book => {
        const bookCard = createBookCard(book);
        booksContainer.appendChild(bookCard);
    })
}

function processNewBook(title, author, pages, read = false){
    const newBook = addBookToLibrary(title, author, pages, read);
    addBookToDisplay(newBook);
}
