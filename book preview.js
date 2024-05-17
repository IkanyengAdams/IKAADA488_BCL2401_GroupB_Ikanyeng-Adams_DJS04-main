import { authors } from './data.js';

class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set book(book) {
    this.render(book);
  }

  render(book) {
    this.shadowRoot.innerHTML = `
      <style>
        .preview {
          display: flex;
          align-items: center;
          padding: 10px;
        }
        .preview__image {
          width: 50px;
          height: 75px;
          margin-right: 10px;
        }
        .preview__info {
          display: flex;
          flex-direction: column;
        }
        .preview__title {
          font-size: 16px;
          margin: 0;
        }
        .preview__author {
          font-size: 14px;
          color: gray;
        }
      </style>
      <button class="preview" data-preview="${book.id}">
        <img class="preview__image" src="${book.image}" />
        <div class="preview__info">
          <h3 class="preview__title">${book.title}</h3>
          <div class="preview__author">${book.author}</div>
        </div>
      </button>
    `;
  }
}

customElements.define('book-preview', BookPreview);
