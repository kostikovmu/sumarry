$(function(){

  $(document).on('scroll', onScroll);

  $("body").on('click', '[href*="#"]', function(e){
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top}, 1000);
    e.preventDefault();
  });

});

function onScroll(event){
  var scrollPosition = $(document).scrollTop();
  $('.nav__link').each(function () {
    var currentLink = $(this);
    var refElement = $(currentLink.attr("href"));
    // var elementPadding = Number(refElement["0"].css('padding').replace('px', ''));
    if (refElement.position().top - 90  <= scrollPosition && refElement.position().top + refElement.height() + 90 > scrollPosition) {
      currentLink.addClass("nav__link--active");
    }
    else{
      currentLink.removeClass("nav__link--active");
    }
  });
}