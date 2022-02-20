import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function useLightBox() {
  const lightBox = new SimpleLightbox(`.gallery a`);
  lightBox.refresh();
}
