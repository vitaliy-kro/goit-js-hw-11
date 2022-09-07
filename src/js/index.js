import Notiflix from 'notiflix';
import InfiniteScroll from 'infinite-scroll';
import '../styles/main.css';
import createCardsMarkup from './createMarkup';
import fetchSearch from './fetchSearch';
import loadMorePages from './loadMorePages';
import smoothScroll from './smoothScroll';
const BASE_URL = 'https://pixabay.com/';
const URL_KEY = '29676323-cbf3b0b0974f66dc50c141bea';
const failureSearchMessage =
  'Sorry, there are no images matching your search query. Please try again.';
export { BASE_URL, URL_KEY, failureSearchMessage };
let page = 1;
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  pageLoadStatus: document.querySelector('.page-load-status'),
};
let infScroll = new InfiniteScroll(refs.gallery, {
  path: () =>
    `${BASE_URL}api/?key=${URL_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${(page += 1)}`,
  history: false,
  scrollThreshold: 100,
});
refs.form.addEventListener('submit', async e => {
  try {
    e.preventDefault();
    clearGallery();
    PageLoadChangingDisplayStyle();
    const trimmedValue = e.target.elements.searchQuery.value.trim();
    if (!trimmedValue) return Notiflix.Notify.warning('Type something!');
    page = 1;
    const fetchResult = await fetchSearch(trimmedValue, page);
    const createdMarkup = await createCardsMarkup(fetchResult, refs.gallery);
    infScroll.on('scrollThreshold', infScrollOptions);
    Notiflix.Notify.success(`Hooray, we found ${fetchResult.total} images`);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(failureSearchMessage);
  }
});

function clearGallery() {
  refs.gallery.innerHTML = '';
}
// function areInputEmpty(e) {
//   return e.target.elements.searchQuery.value.trim();
// }
async function infScrollOptions() {
  try {
    const fetch = await loadMorePages(
      refs.form.elements.searchQuery.value,
      page
    );
    if (!fetch.hits.length) throw new Error();
    const createdMarkup = await createCardsMarkup(fetch, refs.gallery);
    smoothScroll();
  } catch (error) {
    PageLoadChangingDisplayStyle(error);
    infScroll.off('scrollThreshold', infScrollOptions);
  }
}
function PageLoadChangingDisplayStyle(error) {
  if (error) {
    refs.pageLoadStatus.style.display = 'block';
    return;
  }
  refs.pageLoadStatus.style.display = 'none';
}
