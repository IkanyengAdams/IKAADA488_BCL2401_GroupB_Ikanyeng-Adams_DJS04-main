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
 