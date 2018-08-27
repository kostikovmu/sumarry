$(function(){

  $(document).on('scroll', onScroll);

  $("body").on('click', '[href*="#"]', function(e){
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top}, 1000);
    e.preventDefault();
    if($(document).width() < 661) {
      menuOff();
    }
  });

  $('body').on('click', '.nav__button', menuOn);

});

function menuOn() {
  $('.nav__menu').show();
  $('.fi-nav-icon-a').removeClass('fi-nav-icon-a').addClass('fi-close-a');
  $('body').off('click', '.nav__button', menuOn).on('click', '.nav__button', menuOff);
}

function menuOff() {
  $('.nav__menu').fadeOut();
  $('.fi-close-a').removeClass('fi-close-a').addClass('fi-nav-icon-a');
  $('body').off('click', '.nav__button', menuOff).on('click', '.nav__button', menuOn);
}

function onScroll(event){
  var scrollPosition = $(document).scrollTop();
  $('.nav__link').each(function () {
    var currentLink = $(this);
    var refElement = $(currentLink.attr("href"));
    if (refElement.position().top - 30   <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
      currentLink.addClass("nav__link--active");
    }
    else{
      currentLink.removeClass("nav__link--active");
    }
  });
}