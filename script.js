// Book constructor function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Method to toggle read status
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Method to get book info as a string
Book.prototype.info = function() {
    const readStatus = this.read ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
};

/*=======================================================
*/

// Library array to store all books
let myLibrary = [];

// Function to add a book to the library
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    console.log(`Added: ${book.info()}`);
}

// Function to display all books in the library
function displayLibrary() {
    console.log("\n=== My Library ===");
    if (myLibrary.length === 0) {
        console.log("No books in library yet.");
        return;
    }
    
    myLibrary.forEach((book, index) => {
        console.log(`${index + 1}. ${book.info()}`);
    });
    console.log(`\nTotal books: ${myLibrary.length}`);
}

// Function to remove a book by index
function removeBook(index) {
    if (index >= 0 && index < myLibrary.length) {
        const removedBook = myLibrary.splice(index, 1)[0];
        console.log(`Removed: ${removedBook.info()}`);
    } else {
        console.log("Invalid book index.");
    }
}

// Function to find a book by title
function findBookByTitle(title) {
    return myLibrary.find(book => 
        book.title.toLowerCase().includes(title.toLowerCase())
    );
}

// ====== DOM FUNCTIONS ======

// Function to render the library on the webpage
function renderLibrary() {
    const libraryDisplay = document.getElementById('library-display');
    const bookCount = document.getElementById('book-count');
    
    // Update book count
    bookCount.textContent = myLibrary.length;
    
    // Clear current display
    libraryDisplay.innerHTML = '';
    
    if (myLibrary.length === 0) {
        libraryDisplay.innerHTML = '<p>No books in your library yet. Add some books to get started!</p>';
        return;
    }
    
    // Create book cards
    myLibrary.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        libraryDisplay.appendChild(bookCard);
    });
}

// Function to create a book card element
function createBookCard(book, index) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    const readStatus = book.read ? 'Read' : 'Not Read';
    const readClass = book.read ? 'read' : 'not-read';
    
    card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p class="read-status ${readClass}"><strong>Status:</strong> ${readStatus}</p>
        <div class="book-actions">
            <button onclick="toggleReadStatus(${index})" class="toggle-btn">
                Mark as ${book.read ? 'Unread' : 'Read'}
            </button>
            <button onclick="removeBookFromLibrary(${index})" class="remove-btn">
                Remove Book
            </button>
        </div>
    `;
    
    return card;
}

// Function to add book from form and update display
function addBookFromForm(title, author, pages, read) {
    addBookToLibrary(title, author, pages, read);
    renderLibrary();
}

// Function to remove book and update display
function removeBookFromLibrary(index) {
    if (index >= 0 && index < myLibrary.length) {
        const removedBook = myLibrary.splice(index, 1)[0];
        console.log(`Removed: ${removedBook.info()}`);
        renderLibrary(); // Update the display
    } else {
        console.log("Invalid book index.");
    }
}

// Function to toggle read status and update display
function toggleReadStatus(index) {
    if (index >= 0 && index < myLibrary.length) {
        myLibrary[index].toggleRead();
        renderLibrary(); // Update the display
    }
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload
    
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;
    
    // Add book to library
    addBookFromForm(title, author, pages, read);
    
    // Clear form
    document.getElementById('book-form').reset();
}

// Initialize the app when page loads
function initializeApp() {
    console.log("Library app initialized!");
    
    // Add event listener to form
    const bookForm = document.getElementById('book-form');
    bookForm.addEventListener('submit', handleFormSubmit);
    
    // Render empty library initially
    renderLibrary();
    
    // Optional: Add some sample books for testing
    addSampleBooks();
}

// Function to add sample books (optional)
function addSampleBooks() {
    addBookFromForm("The Hobbit", "J.R.R. Tolkien", 295, true);
    addBookFromForm("1984", "George Orwell", 328, false);
    addBookFromForm("To Kill a Mockingbird", "Harper Lee", 281, true);
    addBookFromForm("Nhân học", "Claude Lévi-Strauss", 155, true);
    addBookFromForm("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
    addBookFromForm("Brave New World", "Aldous Huxley", 268, true);
    addBookFromForm("Fahrenheit 451", "Ray Bradbury", 158, false);
    addBookFromForm("The Catcher in the Rye", "J.D. Salinger", 277, true);
    addBookFromForm("Pride and Prejudice", "Jane Austen", 279, false);
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

