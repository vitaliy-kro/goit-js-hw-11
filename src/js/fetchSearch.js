import axios from 'axios';
import { BASE_URL, URL_KEY } from './index';
export default async function fetchSearch(value, page) {
  const axiosGet = await axios.get(
    `${BASE_URL}api/?key=${URL_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );

  if (!axiosGet.data.total) throw new Error();

  return axiosGet.data;
}
