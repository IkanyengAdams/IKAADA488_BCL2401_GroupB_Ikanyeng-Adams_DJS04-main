import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { renderBookPreviews } from "./bookPreview.js";
import { populateDropDownOptions } from "./populateDropDownOptions.js";
import { handleSearch } from "./handleSearch.js";
import { setColorTheme } from "./theme.js";

// Global variables
let page = 1;
let matches = books;


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



// Function  to handle the search


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

document.addEventListener('DOMContentLoaded', function(){
  initialize();
})

function initialize() {
  renderBookPreviews();
  populateDropDownOptions();
  setColorTheme();
  setupEventListeners();
  renderBooks();
  handleShowMore();
}




