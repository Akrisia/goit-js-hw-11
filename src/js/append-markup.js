import { refs } from './refs';
import photosTpl from '../templates/photos.hbs';

export function appendMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', photosTpl(hits));
}
