import "normalize.css";
import "./style.scss";
import Navigo from "navigo";
import { Header } from "./modules/Header/Header";
import { Main } from "./modules/Main/Main";
import { Footer } from "./modules/Footer/Footer";

const productSlider = () => {
  Promise.all([import("swiper/modules"), import("swiper"), import("swiper/css")]).then(
    ([{ Navigation, Thumbs }, Swiper]) => {
      const swiperThumbnails = new Swiper.default(".product__slider-thumbnails", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });

      new Swiper.default(".product__slider-main", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".product__arrow_next",
          prevEl: ".product__arrow_prev",
        },
        modules: [Navigation, Thumbs],
        thumbs: {
          swiper: swiperThumbnails,
        },
      });
    },
  );
};

const Init = () => {

  //const header = new Header();

  new Header().mount();
  new Main().mount();
  new Footer().mount();
  productSlider();

  const router = new Navigo("/", { linksSelector: 'a[href^="/"]' });
  router
    .on("/", () => {
      console.log("на главной");
    })
    .on("/category", (obj) => {
      console.log("категория - ", obj);
    })
    .on("/favorite", () => {
      console.log("избранное");
    })
    .on("/search", () => {
      console.log("поиск");
    })
    .on("/product/:id", (obj) => {
      console.log("продукт - ", obj);
    })
    .on("/cart", () => {
      console.log("корзина");
    })
    .on("/order", () => {
      console.log("заказ");
    })
    .notFound(() => {
      document.body.innerHTML ='<h2>Страница не найдена</h2>';
      console.log(404);
    });

  router.resolve();
};

Init();
