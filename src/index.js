import './sass/main.scss';
import PicsApiService from './js/api-service';
import { refs } from './js/refs';
import { useLightBox } from './js/use-lightbox';
import { clearGallery } from './js/clear-gallery';
import { appendMarkup } from './js/append-markup';

const picsApiService = new PicsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();

  picsApiService.query = evt.currentTarget.elements.searchQuery.value;
  picsApiService.resetPage();
  picsApiService.fetchPhotos().then(hits => {
    clearGallery();
    if (hits) {
      appendMarkup(hits);
      useLightBox();
      refs.loadMoreBtn.classList.remove('visually-hidden');
    }
    return;
  });
}

function onLoadMore() {
  picsApiService.fetchPhotos().then(appendMarkup).then(useLightBox);
}
