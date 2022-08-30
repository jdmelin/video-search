import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('search-results')
export class App extends LitElement {
  @property({ type: String })
  results: any;

  static styles = css``;

  render() {
    return html`
      <h2>Search results: ${this.results[0].title}</h2>
      <img src=${this.results[0].thumbnail} />
    `;
  }
}
