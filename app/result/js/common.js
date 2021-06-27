jQuery(document).ready(function( $ ) {


  /************************************/

/*$('.wrapper').prepend('<span class="eye-3"></span>');
let pg = parseInt(document.location.pathname.match(/\d+/))
$('body').addClass('active').css('background-image', "url('../img/"+pg+".jpg')");
$('body:not(.active)').css('background-image', "unset");

$('.eye-3').click(function (e) {
  e.preventDefault();  
  $('body').toggleClass('active');
  let pg = parseInt(document.location.pathname.match(/\d+/));
  $('body.active').css('background-image', "url('../img/"+pg+".jpg')");
  $('body:not(.active)').css('background-image', "unset");

});*/

/************************************/


$('.char-prod-gal-min').click(function (e) {
  e.preventDefault();
  let imgSrc = $(this).find('img').attr('src');  
  let bigImgW = $('.char-prod-gal-ph-b');
  let bigImg = $('.char-prod-gal-ph-b img');
  bigImgW.removeClass('big-video');
  $('.char-prod-gal-min').removeClass('act');
  $(this).addClass('act');

  if ($(this).hasClass('_video')) {
    bigImg.attr('src', imgSrc);
    bigImgW.addClass('big-video');
  }
  else {    
    bigImg.attr('src',imgSrc);
  }

});



$('.filter-open').click(function (e) {
  e.preventDefault();
  $(this).toggleClass('enable');
  $('.catalog-col-l').toggleClass('show');
  $('.catalog-col-r').toggleClass('catalog-col-r-full');
});


$('.sproduct-quantity-controls').each(function () {
  let inputt = $(this).find('.sproduct-quantity-input');
  let minuss = $(this).find('.sproduct-quantity-minus');
  let pluss = $(this).find('.sproduct-quantity-plus');

  pluss.click(function (e) {
    e.preventDefault();
    input_val = +inputt.attr('value') + 1;
    inputt.attr('value', input_val);
  });

  minuss.click(function (e) {
    e.preventDefault();
    if (+inputt.attr('value') > 1) {
      input_val = +inputt.attr('value') - 1;
      inputt.attr('value', input_val);
    }    
  });
});


$('.catfilter-it').each(function () {
  let tit = $(this).find('.catfilter-tit');
  let cont = $(this).find('.catfilter-cont');
  tit.click(function (e) {
    e.preventDefault();
    $(this).toggleClass('hide');
    cont.toggleClass('hide');
  });
});

if ( $('.relateprods-container').length ) {
  new Swiper('.relateprods-container', {

    scrollbar: {
      el: '.swiper-scrollbar',
      //перетаскивать скролл мышью
      draggable: true
    },
    slidesPerView: 1,
    //перетаскивание на пк
    simulateTouch: true,
    //чувствительность свайпа
    touchRatio: 1,
    //угол срабатывания свайпа
    touchAngle: 45,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1200: {
        slidesPerView: 5, 
        spaceBetween: 0,
        loop: true,
      },
      992: {
        slidesPerView: 4,         
      },
      768: {
        slidesPerView: 3,         
      },
      576: {   
        slidesPerView: 2,
      },
      576: {   
        slidesPerView: 2,
      },
    },

  });
}


if($('.card-prod-r-basket-input').length) {
$('.card-prod-r-basket-input').select2({
  minimumResultsForSearch: -1
});    
}



if($('.card-prod-r-basket-input-2').length) {

function formatData (data) {
  if (!data.id) { return data.text; }
  var $result= $(
    '<span><img src="../img/russia.jpg"/> ' + data.text + '</span>'
  );
  return $result;
};

$(".card-prod-r-basket-input-2").select2({
  templateResult: formatData,
  templateSelection: formatData,
minimumResultsForSearch: -1
});

}//if

if ( $(".quick-ord-input").length ) {
$(".quick-ord-input").mask("+7 999 999-99-99");
}



$('.scard-tabs .tabs_control_link').click(function (e) {
  e.preventDefault();

  var item = $(this).closest('.scard-tabs .tabs_control_item'),
  contentItem = $('.scard-tabs .tabs_content_item'),
  itemPosition = item.index();

  contentItem.eq(itemPosition)
  .add(item)
  .addClass('active')
  .siblings()
  .removeClass('active');

});


}); //ready




//RANGE
const priceSlider = document.querySelector('.price__range');
if (priceSlider) {

  //let textFrom = priceSlider.getAttribute('data-from');
  let textTo = priceSlider.getAttribute('data-to');

  noUiSlider.create(priceSlider, {
    start: [4290, 19990],
    connect: true,
    //tooltips: [wNumb({ decimals: 0, prefix: '' + '' }), wNumb({ decimals: 0, prefix: '' + '' })],
    range: {
      'min': [0],
      'max': [25000]
    }    
  });

  
  const priceStart = document.getElementById('price-start');
  const priceEnd = document.getElementById('price-end');
  priceStart.addEventListener('change', setPriceValues);
  priceEnd.addEventListener('change', setPriceValues);
  



//Значения из ползунков в инпуты
priceSlider.noUiSlider.on('update', function(values, handle) {
  priceStart.value = +Math.round(priceSlider.noUiSlider.get()[0]);
  priceEnd.value = +Math.round(priceSlider.noUiSlider.get()[1]);
});



function setPriceValues() {



  let priceStartValue;
  let priceEndValue;
  if (priceStart.value != '') {
    priceStartValue = priceStart.value;
  }
  if (priceEnd.value != '') {
    priceEndValue = priceEnd.value;
  }
  priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);


  } //spV
}// if priceSlider



