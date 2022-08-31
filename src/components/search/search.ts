import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Result } from '../../models/result.model';
import SearchService from '../../services/searchService';
import '../../components/search-results/searchResults';

@customElement('search-container')
export class Search extends LitElement {
  @property()
  results: Result[] = [];
  keyword: string = '';
  sortBy: string = '';

  static styles = css`
    .search-container {
      perspective: 4000px;
    }

    .search-wrapper {
      background: linear-gradient(
        rgb(255, 255, 255) 0%,
        rgb(255, 255, 255) 65%,
        transparent 100%
      );
      border-radius: 2px;
      height: 600px;
      left: calc(50% - 265px);
      position: absolute;
      top: calc(50vh - 357px);
      transform: rotate3d(-45, -31, 25, -56deg);
      width: 465px;
    }

    .search-form {
      margin: 2rem;
    }

    .search-input {
      border: 2px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 2rem;
      margin-bottom: 2rem;
      padding: 0.5rem;
      width: 100%;
    }

    .radio-container {
      display: flex;
      font-size: 1.5rem;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .radio-label {
      cursor: pointer;
      display: block;
      margin-bottom: 12px;
      padding-left: 35px;
      position: relative;
      user-select: none;
    }

    .radio-label:hover input ~ .custom-radio {
      background-color: #ccc;
    }

    .radio-label input {
      opacity: 0;
      height: 0;
      width: 0;
    }

    .radio-label input:checked ~ .custom-radio {
      background-color: #03adfc;
    }

    .radio-label input:checked ~ .custom-radio:after {
      display: block;
    }

    .custom-radio {
      background-color: #eee;
      border-radius: 50%;
      height: 25px;
      left: 0;
      position: absolute;
      top: 0;
      width: 25px;
    }

    .custom-radio:after {
      background: #fff;
      border-radius: 50%;
      content: '';
      display: none;
      height: 8px;
      left: 9px;
      position: absolute;
      top: 9px;
      width: 8px;
    }

    .search-button-container {
      text-align: center;
    }

    .search-button {
      background-color: #03adfc;
      border: none;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      font-size: 2rem;
      padding: 0.5rem;
      transition: background-color 0.15s;
      width: 150px;
    }

    .search-button:hover {
      background-color: #0078b0;
    }

    .search-button:disabled {
      background-color: #ccc;
      cursor: default;
    }

    @media screen and (min-width: 1200px) {
      .search-container {
        perspective: 4500px;
      }
    }

    @media screen and (min-width: 1920px) {
      .search-container {
        perspective: 5000px;
      }
    }
  `;

  render() {
    return html`
      <div class="search-container">
        <div class="search-wrapper">
          <form class="search-form">
            <input
              class="search-input"
              type="text"
              placeholder="Search"
              required
              @input=${this._onChangeKeyword}
            />
            <div class="radio-container">
              <label class="radio-label" for="relevance"
                >Relevance
                <input
                  id="relevance"
                  type="radio"
                  value="relevance"
                  name="sortBy"
                  @input=${this._onSelectRadio}
                />
                <span class="custom-radio"></span>
              </label>
              <label class="radio-label" for="date"
                >Date
                <input
                  id="date"
                  type="radio"
                  value="date"
                  name="sortBy"
                  @input=${this._onSelectRadio}
                />
                <span class="custom-radio"></span>
              </label>
              <label class="radio-label" for="rating"
                >Rating
                <input
                  id="rating"
                  type="radio"
                  value="rating"
                  name="sortBy"
                  @input=${this._onSelectRadio}
                />
                <span class="custom-radio"></span>
              </label>
            </div>
            <div class="search-button-container">
              <button
                @click=${this._submit}
                class="search-button"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
          <search-results .results=${this.results}></search-results>
        </div>
      </div>
    `;
  }

  _onChangeKeyword(event: Event) {
    this.keyword = (event.target as HTMLInputElement).value;
  }

  _onSelectRadio(event: Event) {
    this.sortBy = (event.target as HTMLInputElement).value;
  }

  async _submit(event: Event) {
    event.preventDefault();

    try {
      const results = await SearchService.searchByKeyword(
        this.keyword,
        this.sortBy
      );
      this.results = results;
    } catch {
      // TODO: handle error
    }
  }
}
