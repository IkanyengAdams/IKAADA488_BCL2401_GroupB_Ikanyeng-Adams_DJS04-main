Book Library Application
This documentation provides an overview of the Book Library application. The application dynamically displays a list of books, allowing users to filter by genre and author, view book details, and switch between day and night themes.

-Web components
* in this project I created web components, opening different Javascript files and applaying the import and export methods. This makes one's code short and more readable

Table of Contents
Introduction
Installation
Usage
Functions
renderBookPreviews
populateDropDownOptions
setColorTheme
setupEventListeners
handleSearch
renderBooks
updateShowMoreButton
handleShowMore
handlePreviewClick
Initialization
Introduction
The Book Library application is a web-based application that allows users to browse through a list of books. Users can filter the list by genre and author, view detailed information about each book, and switch between day and night themes.

Installation
Clone the repository:
sh
Copy code
git clone https://github.com/yourusername/book-library.git
Navigate to the project directory:
sh
Copy code
cd book-library
Open index.html in your preferred web browser.
Usage
Once the application is open in the browser, users can:

Browse the list of book previews.
Use the search overlay to filter books by title, genre, and author.
Click on a book preview to see detailed information.
Switch between day and night themes using the settings overlay.
Load more books using the "Show more" button.
Functions
renderBookPreviews
Renders a preview of books based on the current matches and appends them to the DOM element with the attribute [data-list-items].

populateDropDownOptions
Creates and populates the dropdown options for genres and authors using the genres and authors data, and appends them to the respective DOM elements.

setColorTheme
Handles the setting of color themes (day or night) based on user selection and saves the preference in localStorage.

setupEventListeners
Sets up various event listeners for:

Closing search and settings overlays.
Opening search and settings overlays.
Handling "Show more" button clicks.
Handling book preview clicks.
Submitting the search form.
handleSearch
Handles the search functionality by filtering books based on the user's search criteria and updates the matches array.

renderBooks
Renders the list of books based on the current matches and appends them to the DOM element with the attribute [data-list-items].

updateShowMoreButton
Updates the state and label of the "Show more" button based on the number of remaining books.

handleShowMore
Handles the "Show more" button functionality, loading more book previews as the user clicks the button.

handlePreviewClick
Handles the click event on a book preview, displaying detailed information about the selected book.

Initialization
Initializes the application by calling the necessary functions to render book previews, populate dropdown options, set the color theme, set up event listeners, and update the "Show more" button. This is done when the DOM content is fully loaded.

This ensures that the application is fully set up and ready for user interaction as soon as the page is loaded.









