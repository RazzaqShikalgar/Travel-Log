let myCarousel = document.querySelectorAll('#featureContainer .carousel .carousel-item');
myCarousel.forEach((el) => {
  const minPerSlide = 5
  let next = el.nextElementSibling
  for (var i=1; i<minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = myCarousel[0]
    }
    let cloneChild = next.cloneNode(true)
    el.appendChild(cloneChild.children[0])
    next = next.nextElementSibling
  }
})


var navbar = document.querySelector('nav')

window.onscroll = function() {

  // pageYOffset or scrollY
  if (window.pageYOffset > 0) {
    navbar.classList.remove('scrolled')
  } else {
    navbar.classList.add('scrolled')
  }
}
