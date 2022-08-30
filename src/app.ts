import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-home')
export class App extends LitElement {
  static styles = css`
    h1 {
      color: #fff;
      float: right;
      font-size: 2rem;
      margin: 0;
      padding: 2rem;
      text-align: center;
      width: 300px;
    }

    .play-button {
      background-color: transparent;
      border-radius: 25px;
      display: block;
      height: 99px;
      left: calc(50% - 107px);
      position: absolute;
      top: calc(50% - 80px);
      transform: rotate3d(1.4, 1.4, 1, -51deg);
      width: 183px;
    }
  `;

  render() {
    return html`
      <section class="home">
        <h1>Press play to search for videos</h1>
        <a class="play-button" href="search"></a>
      </section>
    `;
  }
}
