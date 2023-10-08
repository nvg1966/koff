import "normalize.css";
import "./style.scss";
import Navigo from "navigo";
import { Header } from "./modules/Header/Header";
import { Main } from "./modules/Main/Main";
import { Footer } from "./modules/Footer/Footer";
import { ProductList } from "./modules/ProductList/ProductList";

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
      new ProductList().mount(new Main().element, [1]);
    }, {    
      // before(done)  {
      //   console.log("before");
      //   done();
      // },      
      // after() {
      //   console.log("after");
      // },     
      leave(done) {
        console.log("leave");
        done();
      },     
      already() {
        console.log("already");
      },
    })
    .on("/category", () => {      
      
        new ProductList().mount(new Main().element, [1, 2, 3, 4, 5, 6], 'Категория');
      },
        {
          leave(done) {
            console.log("leave");
            done();
          },
        }
    )
    .on("/favorite", () => {
      
        new ProductList().mount(new Main().element, [1, 2, 3], 'Избранное');
      },
        {
          leave(done) {
            console.log("leave");
            done();
          },
        }
    )
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
      new Main().element.innerHTML = `
        <h2>Страница не найдена</h2>
        <p>Через 5 секунд вы будете перенаправлены на <a href="/">главную страницу</a></p>
      `;    
      setTimeout(() => {
        router.navigate('/');
      }, 5000);

    });

  router.resolve();
};

Init();
