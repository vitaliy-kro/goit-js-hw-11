import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import card from '../template/card.handlebars';

export default async function createCardsMarkup(cards, element) {
  const createMarkup = await cards.hits.map(e => card(e)).join('');
  const addToDOM = await element.insertAdjacentHTML('beforeend', createMarkup);
  const lightbox = new SimpleLightbox('.gallery__item');
  lightbox.refresh();
}
