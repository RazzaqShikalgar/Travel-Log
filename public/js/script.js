var swiper = new Swiper(".slide-container", {
  slidesPerView: 4,
  spaceBetween: 20,
  sliderPerGroup: 4,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 4,
    },
  },
});



document.querySelectorAll('.about .video-container .controls .control-btn').forEach(btn =>{
  btn.onclick = () =>{
      let src = btn.getAttribute('data-src');
      document.querySelector('.about .video-container .video').src = src;
  }
})






    AOS.init({
        duration: 800,
        offset:150,
    });


   

  // Search Switch
  $('.search-switch').on('click', function () {
      $('.search-model').fadeIn(400);
  });

  $('.search-close-switch').on('click', function () {
      $('.search-model').fadeOut(400, function () {
          $('#search-input').val('');
      });
  });



  $('.set-bg').each(function () {
    var bg = $(this).data('setbg');
    $(this).css('background-image', 'url(' + bg + ')');
});






    