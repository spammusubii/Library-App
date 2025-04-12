// Object Constructors
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

// Data
const myLibrary = [
    new Book(crypto.randomUUID(),"Harry Potter", "J. K. Rowling", 123, true),
    new Book(crypto.randomUUID(),"Spiderman", "Stanley", 133, false),
    new Book(crypto.randomUUID(),"Green Eggs and Ham", "Dr. Seuss", 423, true)
];

// DOM Elements
const booksContainer = document.querySelector(".books-container");
const addBookButton = document.querySelector("#add-book-btn");
const addBookModal = document.querySelector("#add-book-modal");
const closeBookModalButton = document.querySelector("#closeModal");
const addBookForm = document.querySelector("#add-book-form");

// Functions
function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    const ul = document.createElement("ul");
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
            li.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
        }

        ul.appendChild(li);
    });
    const removeBtn = document.createElement("button");
    removeBtn.addEventListener('click', (e) => {
        bookCard.remove();
        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1)  myLibrary.splice(index, -1);
    })
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("class", "remove-card-btn")
    ul.appendChild(removeBtn);

    bookCard.appendChild(ul);
    bookCard.setAttribute("id", book.id);
    return bookCard;
}

function displayAllBooks(library){
    booksContainer.innerHTML = "";
    library.forEach(book => {
        const bookCard = createBookCard(book);
        booksContainer.appendChild(bookCard);
    })
}

function processNewBook(form){
    const title = form.title.value.trim();
    const author = form.author.value.trim();
    const pages = Number(form.pages.value);
    const read = form.read.checked;

    if (!title || !author || isNaN(pages)) {
        alert("Please fill out all required fields.");
        return;
    }

    const newBook = addBookToLibrary(title, author, pages, read);
    const bookCard = createBookCard(newBook);
    booksContainer.appendChild(bookCard);

    form.reset();
    addBookModal.close();
}

// Modal Logic
addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
})

closeBookModalButton.addEventListener("click", () => {
    addBookModal.close();
})

addBookModal.addEventListener('click', (e) => {
    if (e.target === addBookModal){
        addBookModal.close();
    }
})

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && addBookModal.open) {
        addBookModal.close();
    }
});

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    processNewBook(addBookForm);
})

// init
function init(){
    displayAllBooks(myLibrary);
}

init();