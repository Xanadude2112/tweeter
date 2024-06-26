//Add a $(document).ready() function to your file to ensure the DOM has loaded.
//runs a callback when the DOM is ready to be manipulated with jQuery
$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let countText = $(this).val().length;
    let counter = $(this).parent().find('.counter');
    counter.text(140 - countText);
    if (140 - countText < 0) {
      counter.addClass("max-count-exceeded");
    } else {
      counter.removeClass("max-count-exceeded");
    }
  });
});