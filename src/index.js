import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { getPhotosPixybay } from './pixabay-api';
import {
  form,
  buttonSearch,
  inputSearch,
  galleryWrapper,
  loadMore,
} from './refs';

let page = 1;
let totalAmountOgPhoto = 0;
let arrOfPhotos = [];

//
async function getData(userInput, page) {
  try {
    const response = await getPhotosPixybay(userInput, page);
    totalAmountOgPhoto = response.totalHits;
    arrOfPhotos = response.hits;
    galleryWrapper.insertAdjacentHTML('beforeend', createCards(arrOfPhotos));
    // var
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(`❌ Oops!… `);
  }
}

//
// markup
function createCards(arrOfPhotos) {
  return arrOfPhotos
    .map(photo => {
      return `<img src="${photo.webformatURL}" />`;
    })
    .join();
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;
  galleryWrapper.innerHTML = '';
  userInput = inputSearch.value;
  await getData(userInput, page);
  if (arrOfPhotos.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMore.classList.add('is-hidden');
  } else {
    Notiflix.Notify.success(`Hooray! We found ${totalAmountOgPhoto} images.`);
    loadMore.classList.add('is-hidden');
  }
});

loadMore.addEventListener('click', async () => {
  page += 1;
  console.log(page);
  await getData(userInput, page);
  if (arrOfPhotos.length === 0) {
    Notiflix.Notify.info('end.');
    loadMore.classList.add('is-hidden');
  }
});

// export function createGalleryCards(arrOfPhotos) {
//     const photos = arrOfPhotos.map(photo => {
//         return `
//         <div class="photo-card">
//         <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" data-bigImg=${photo.largeImageURL}/>
//         <div class="info">
//           <p class="info-item">
//             <b>Likes</b> ${photo.likes}
//           </p>
//           <p class="info-item">
//             <b>Views</b> ${photo.views}
//           </p>
//           <p class="info-item">
//             <b>Comments</b> ${photo.comments}
//           </p>
//           <p class="info-item">
//             <b>Downloads</b> ${photo.downloads}
//           </p>
//         </div>
//       </div>
//       `
//       })
//       .join('');
//       return photos;
//   };
