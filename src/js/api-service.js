import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25787045-a8ddf7324e727a4045d3f3d7c';

export default class PicsApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  async fetchPhotos() {
    try {
      const response = await axios.get(
        `${BASE_URL}/?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
      );
      if (response.data.totalHits === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`,
        );
        return;
      }
      if (this.page - 1 > response.data.totalHits / 40) {
        Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
        return;
      }
      this.incrementPage();
      return response.data.hits;
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
