jQuery(document).ready(function( $ ) {


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

}); //ready

