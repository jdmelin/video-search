import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { Result } from '../../models/result.model';
import SearchService from '../../services/searchService';

@customElement('search-result')
export class SearchResult extends LitElement {
  @property()
  result!: Result;

  static styles = css`
    .search-result {
      display: flex;
      margin-bottom: 1rem;
    }

    .search-result-thumbnail {
      width: 94px;
    }

    .search-result-content {
      margin: 0 1rem;
    }

    .search-result-title,
    .search-result-description {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 275px;
    }

    .search-result-title {
      color: #03adfc;
      display: block;
      font-size: 1.375rem;
      text-decoration: none;
      transition: color 0.15s;
    }

    .search-result-title:hover {
      color: #0078b0;
    }

    .search-result-comments {
      color: #999;
    }
  `;

  async getComments() {
    try {
      const commentCount = await SearchService.getVideoComments(this.result.id);
      const formattedText = commentCount > 1 ? 'Comments' : 'Comment';

      if (commentCount) {
        return html`<span class="search-result-comments"
          >${commentCount} ${formattedText}</span
        >`;
      } else {
        return html`<span class="search-result-comments">No Comments</span>`;
      }
    } catch {
      // TODO: handle error
    }
  }

  render() {
    const { description, id, thumbnail, title } = this.result;

    return html`
      <div class="search-result">
        <img class="search-result-thumbnail" src=${thumbnail} />
        <div class="search-result-content">
          <a
            class="search-result-title"
            href="https://www.youtube.com/watch?v=${id}"
            target="_blank"
            >${title}</a
          >
          <p class="search-result-description">${description}</p>
          ${until(this.getComments())}
        </div>
      </div>
    `;
  }
}
