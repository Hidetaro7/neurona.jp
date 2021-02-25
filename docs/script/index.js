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
