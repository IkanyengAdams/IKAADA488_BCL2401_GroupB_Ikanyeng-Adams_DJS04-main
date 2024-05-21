// Function for color theme: either night or day
export function setColorTheme() {
  document.querySelector("[data-settings-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'night' || theme === 'night') {
      document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty("--color-light", "255, 255, 255");
    }

    document.querySelector("[data-settings-overlay]").open = false;
  });
}
