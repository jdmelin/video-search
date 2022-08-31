import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Result } from '../../models/result.model';
import '../../components/search-result/searchResult';

@customElement('search-results')
export class SearchResults extends LitElement {
  @property()
  results!: Result[];

  static styles = css`
    .search-results-container {
      height: 365px;
      overflow: scroll;
      padding: 0 2rem;
      position: relative;
    }

    .search-results-container::-webkit-scrollbar {
      display: none;
    }

    .no-results {
      font-size: 1.5rem;
    }
  `;

  getSearchResults() {
    if (this.results) {
      return html` ${this.results.map(
        (result: Result) => html`<search-result .result=${result}></search-result>`
      )}`;
    } else {
      return html``;
    }
  }

  render() {
    return html`
      <section class="search-results-container">
        ${this.getSearchResults()}
      </section>
    `;
  }
}
