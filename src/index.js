import photosTpl from './templates/photos.hbs';
import './sass/main.scss';
import PicsApiService from './js/api-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const picsApiService = new PicsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();

  picsApiService.query = evt.currentTarget.elements.searchQuery.value;
  picsApiService.resetPage();
  picsApiService.fetchPhotos().then(hits => {
    clearPhotosContainer();
    if (hits) {
      appendPhotosMarkup(hits);
      refs.loadMoreBtn.classList.remove('visually-hidden');
    }
    return;
  });
}

function onLoadMore() {
  picsApiService.fetchPhotos().then(appendPhotosMarkup);
}

function appendPhotosMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', photosTpl(hits));
  const lightBox = new SimpleLightbox(`.gallery a`);
  lightBox.refresh();
}

function clearPhotosContainer() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('visually-hidden');
}
