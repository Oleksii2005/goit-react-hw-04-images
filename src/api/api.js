// 37337177-370a5d12901e80f2cbcbb379d
import axios from 'axios';
const API_KEY = '37337177-370a5d12901e80f2cbcbb379d';

async function getImages(query, page, perPage) {
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  const res = await axios.get(url);
  return res.data;
}
export { getImages };
