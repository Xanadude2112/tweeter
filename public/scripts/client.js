/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//////////////////////////////////////////////////////    ALL FUNCTIONS CAN BE FOUND IN helpers.js    ///////////////////////////////////////////////////////
const $tweetArrows = $("#down-arrow");
const $textArea = $("#tweet-text");

// For touch interactions
$tweetArrows.on("touchstart", function() {
  $tweetArrows.addClass("down-arrow-click");
});

$tweetArrows.on("touchend", function() {
  $tweetArrows.removeClass("down-arrow-click");
  $textArea.click();
  $textArea.focus(); 
});

// For mouse clicks
$tweetArrows.on("mousedown", function() {
  $tweetArrows.addClass("down-arrow-click");
});

$tweetArrows.on("mouseup", function() {
  $tweetArrows.removeClass("down-arrow-click");
  $textArea.click();
  $textArea.focus(); 
});

// Allow the usse of the enter button to submit a tweet
$("#tweet-text").on("keydown", function(event) {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault(); // prevent default behavior of pressing Enter (new line)
    $("#tweet-form").submit(); // submit the form

  }
});

$("#tweet-form").on("submit", function(event) {
  event.preventDefault();
  const formData = $("#tweet-form").serialize(); // converts data into a query string
  let textContent = $("#tweet-text");
  if (textContent.val().trim().length === 0) {
    // we use .empty to make sure it wont print the error more than once
    // then we use .slideUp aand then .slideDown to trigger the animation on each click
    $("#error-message")
      .empty()
      .slideUp()
      .append(
        `<i class="fa-solid fa-triangle-exclamation"></i> Tweet tweet! There is no tweeter in sight, please release one into the air! <i class="fa-solid fa-triangle-exclamation"></i>`
      )
      .slideDown();
  } else if (textContent.val().length > 140) {
    // we use .empty to make sure it wont print the error more than once
    // then we use .slideUp aand then .slideDown to trigger the animation on each click
    $("#error-message")
      .empty()
      .slideUp()
      .append(
        `<i class="fa-solid fa-triangle-exclamation"></i> Tweet tweet! Your tweeter is too heavy to fly, please lighten it so it can take to the air! <i class="fa-solid fa-triangle-exclamation"></i>`
      )
      .slideDown();
  } else {
    //make an AJAX POST request (with jQuery) *LONGHAND*
    $.ajax({
      url: "/tweets", // define the url when youre submitting the request
      method: "POST", // whatever tweet is submitted will be posted to the server
      data: formData, // this comes from line 35 which holds the data between lines 70 and 80 in index.html
      success: function(response) {
        // if using shorthand .post, success can equate to the .then seen at line 55
        // when the post has successfully been submitted to the /tweet
        loadTweets();
        textContent.val("");
        $(".counter").text("140");
        $("#error-message").slideUp();
        console.log("Tweet submitted successfully:", response);
      },
      error: function(error) {
        // when the post has not successfully been submitted to the /tweet

        console.error("Error submitting tweet:", error);
      },
    });
  }
});

loadTweets();
