class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { theme } = Object.fromEntries(formData);

      localStorage.setItem('theme', theme);

      document.documentElement.style.setProperty('--color-dark', theme === 'night' ? '255, 255, 255' : '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', theme === 'night' ? '10, 10, 20' : '255, 255, 255');

      this.shadowRoot.querySelector("[data-settings-overlay]").open = false;
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <form data-settings-form>
        <label>
          <input type="radio" name="theme" value="day"> Day
        </label>
        <label>
          <input type="radio" name="theme" value="night"> Night
        </label>
        <button type="submit">Apply</button>
      </form>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle);
