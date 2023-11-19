import axios from 'axios';
// import { page } from './index';

const API_KEY = '40711128-36f054e20f11fdfe312beb589';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPhotosPixybay(userInput, page, per_page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
  });
  const res = await axios.get(`${BASE_URL}?${params}`);

  console.log(res.data);
  return res.data;
}
