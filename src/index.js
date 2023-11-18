import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { getPhotosPixybay } from './pixabay-api';
import { form, inputSearch, galleryWrapper, loadMore } from './refs';

let page = 1;
let totalPhoto = 0;
let arrOfPhotos = [];

//
async function getData(userInput, page) {
  try {
    const response = await getPhotosPixybay(userInput, page);
    totalPhoto = response.totalHits;
    arrOfPhotos = response.hits;
    galleryWrapper.insertAdjacentHTML('beforeend', createCards(arrOfPhotos));
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
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
      return `
              <a class="photo-card" href="${photo.largeImageURL}">
              <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" class="photo-img"" data-bigImg=${photo.largeImageURL}/>
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  <b>${photo.likes}</b>
                </p>
                <p class="info-item">
                  <b>Views</b> 
                  <b>${photo.views}</b>
                </p>
                <p class="info-item">
                  <b>Comments</b> 
                  <b>${photo.comments}</b> 
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  <b> ${photo.downloads}</b>
                </p>
              </div>
            </a>
            `;
    })
    .join('');
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
    Notiflix.Notify.success(`Hooray! We found ${totalPhoto} images.`);
    loadMore.classList.remove('is-hidden');
  }
});

loadMore.addEventListener('click', async () => {
  page += 1;
  console.log(page);
  await getData(userInput, page);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  if (arrOfPhotos.length === 0) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    loadMore.classList.add('is-hidden');
  }
});

const up = document.querySelector('.up');

window.onscroll = () => {
  if (window.scrollY > 500) {
    up.classList.remove('is-hidden');
  } else {
    up.classList.add('is-hidden');
  }
};

up.addEventListener('click', () => {
  window.scrollTo(0, 0);
});
