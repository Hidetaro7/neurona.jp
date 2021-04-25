console.log('Hello ニューロナWorld');

const bodyElement = document.body;

function onScroll () {
  if(window.scrollY >= 70) {
    bodyElement.classList.add("is-headerfixed")
  }else{
    bodyElement.classList.remove("is-headerfixed")
  }
}

window.onscroll = onScroll;

// swiper

var mySwiper = new Swiper ('.swiper-container', {
  breakpoints: {
    320: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    }
  },
  spaceBetween: 16,//何ピクセル画像の間隔をあけるか
  centeredSlides : true,
  //自動再生する場合
  autoplay: {
  delay: 2000,
  },
  loop: true,//最後の画像までいったらループする
  //ページネーションをつける場合
  pagination: {
   el: '.swiper-pagination',
   type: 'bullets',
   clickable: true,
  },
  //左右のナビゲーションをつける場合
  navigation: {
   nextEl: '.swiper-button-next',
   prevEl: '.swiper-button-prev',
  }
 });
