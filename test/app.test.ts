import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { App } from '../src/app.js';
import '../src/app.js';

describe('App', () => {
  let element: App;

  beforeEach(async () => {
    element = await fixture(html`<app-home></app-home>`);
  });

  it('renders the title', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('Press play to search for videos');
  });
});
