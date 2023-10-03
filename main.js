import 'normalize.css';
import './style.scss';

import {Navigation, Thumbs} from 'swiper/modules';
import Swiper  from 'swiper';
import 'swiper/css';

const productThumbnails = new Swiper(".product__slider-thumbnails", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

new Swiper(".product__slider-main", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".product__arrow-next",
    prevEl: ".product__arrow-prev",
  },
  modules: [Navigation, Thumbs],
  thumbs: {
    swiper: productThumbnails,
  },
});