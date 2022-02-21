import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25787045-a8ddf7324e727a4045d3f3d7c';

export default class PicsApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  async fetchPhotos() {
    try {
      const {
        data: { hits, totalHits },
      } = await axios.get(
        `${BASE_URL}/?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
      );
      if (totalHits === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`,
        );
        return;
      } else if (this.page > totalHits / 40) {
        refs.loadMoreBtn.classList.add('visually-hidden');
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
      } else if (this.page > 1) {
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      }
      this.incrementPage();
      return hits;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get searchQuery() {
    return this.query;
  }

  set searchQuery(newQuery) {
    this.query = newQuery;
  }
}
