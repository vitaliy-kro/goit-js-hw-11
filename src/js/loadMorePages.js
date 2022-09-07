import { BASE_URL, URL_KEY } from './index';
import axios from 'axios';
export default async function loadMorePages(value, page) {
  const axiosGet = await axios.get(
    `${BASE_URL}/api/?key=${URL_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  return axiosGet.data;
}
