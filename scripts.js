import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { renderBookPreviews } from "./bookPreview.js";

// Global variables
let page = 1;
let matches = books;

// Function to render book previews

renderBookPreviews();

// Function to create HTML fragments for genres or authors
function populateDropDownOptions() {
    const genreHtml = document.createDocumentFragment();
const firstGenreElement = document.createElement("option");
firstGenreElement.value = "any";
firstGenreElement.innerText = "All Genres";
genreHtml.appendChild(firstGenreElement);

for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  genreHtml.appendChild(element);
}

document.querySelector("[data-search-genres]").appendChild(genreHtml);

const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = document.createElement("option");
firstAuthorElement.value = "any";
firstAuthorElement.innerText = "All Authors";
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  authorsHtml.appendChild(element);
}

document.querySelector("[data-search-authors]").appendChild(authorsHtml);
}

populateDropDownOptions();


// Function for color theme: either night or day
function setColorTheme() {
  document.querySelector("[data-settings-form]")
.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'night') {
      document.documentElement.style.setProperty(
          "--color-dark",
          "255, 255, 255"
      );
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
} else {
  document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
  document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
  );

  
}


  if (theme === "night") {
    document.documentElement.style.setProperty(
      "--color-dark",
      "255, 255, 255"
    );
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }

  document.querySelector("[data-settings-overlay]").open = false;
});
    
    document.querySelector("[data-list-button]").innerText = `Show more (${
      books.length - BOOKS_PER_PAGE
    })`;
    document.querySelector("[data-list-button]").disabled =
      matches.length - page * BOOKS_PER_PAGE === 0;
    
    document.querySelector("[data-list-button]").innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;
}

setColorTheme();


// Event Listerners
function setupEventListeners() {
  document.querySelector("[data-search-cancel]").addEventListener("click", () => {
    document.querySelector("[data-search-overlay]").open = false;
  });

  document.querySelector("[data-settings-cancel]").addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

  document.querySelector("[data-header-search]").addEventListener("click", () => {
    document.querySelector("[data-search-overlay]").open = true;
    document.querySelector("[data-search-title]").focus();
  });

  document.querySelector("[data-header-settings]").addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });

  document.querySelector("[data-list-close]").addEventListener("click", () => {
    document.querySelector("[data-list-active]").open = false;
  });

  document.querySelector("[data-list-button]").addEventListener("click", handleShowMore);

  document.querySelector("[data-list-items]").addEventListener("click", handlePreviewClick);

  document.querySelector("[data-search-form]").addEventListener("submit", handleSearch);
}

setupEventListeners();

// Function  to handle the search
function handleSearch(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === "any";

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  if (result.length < 1) {
    document.querySelector("[data-list-message]").classList.add("list__message_show");
  } else {
    document.querySelector("[data-list-message]").classList.remove("list__message_show");
  }

  renderBooks();
  document.querySelector("[data-search-overlay]").open = false;
}

// Function to render books
function renderBooks() {
  document.querySelector("[data-list-items]").innerHTML = "";
  const newItems = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    newItems.appendChild(element);
  }

  document.querySelector("[data-list-items]").appendChild(newItems);
  updateShowMoreButton();
}

function updateShowMoreButton() {
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  const showMoreButton = document.querySelector("[data-list-button]");
  showMoreButton.disabled = remainingBooks <= 0;
  showMoreButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
  `;
}

// Function that the "show more" button handles
function handleShowMore() {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    fragment.appendChild(element);
  }

  document.querySelector("[data-list-items]").appendChild(fragment);
  page += 1;

  updateShowMoreButton();
}


// Function to handle clicking on a book preview
function handlePreviewClick(event) {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  if (active) {
    document.querySelector("[data-list-active]").open = true;
    document.querySelector("[data-list-blur]").src = active.image;
    document.querySelector("[data-list-image]").src = active.image;
    document.querySelector("[data-list-title]").innerText = active.title;
    document.querySelector("[data-list-subtitle]").innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    document.querySelector("[data-list-description]").innerText = active.description;
  }
}




