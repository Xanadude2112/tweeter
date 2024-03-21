/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// Escape function to prevent XSS
const escapeSymbol = function(str) {
  let div = document.createElement("div");//create empty div
  div.appendChild(document.createTextNode(str));// Append the string as a text node to the div we created
  return div.innerHTML;// Return the inner HTML of the div, effectively escaping any HTML symbols
};

const renderTweets = function (tweetArray) {
  for (let index of tweetArray) {
    const tweet = createTweetElement(index);
    // takes return value from createTweetelement functon and prpends (posts from earliest down to latest post) it to the tweets container
    $("#tweets-container").prepend(tweet);
  }
};

const createTweetElement = function (tweetObject) {
  const $tweet = $(`
  <article class="all-tweets">
    <header>
      <p class="user"><i class="user-icon fa-solid fa-user-astronaut"></i> ${
        escapeSymbol(tweetObject.user.name)
      }</p>
      <p class="user-id">${escapeSymbol(tweetObject.user.handle)}</p>
    </header>
    <p class="tweet-content">${escapeSymbol(tweetObject.content.text)}</p>
    <footer>
      <p>${timeago.format(tweetObject.created_at)}</p>
      <p class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
  </article>`);
  return $tweet;
};

$("#tweet-form").on("submit", function (event) {
  event.preventDefault();
  const formData = $("#tweet-form").serialize(); // converts data into a query string
  let textContent = $("#tweet-text");
  if (textContent.val().trim().length === 0) {
    // we use .empty to make sure it wont print the error more than once
    // then we use .slideUp aand then .slideDown to trigger the animation on each click
    $('#error-message').empty().slideUp().append(`<i class="fa-solid fa-triangle-exclamation"></i> Tweet tweet! There is no tweeter in sight, please release one into the air! <i class="fa-solid fa-triangle-exclamation"></i>`).slideDown();
  } else if (textContent.val().length > 140) {
    // we use .empty to make sure it wont print the error more than once
    // then we use .slideUp aand then .slideDown to trigger the animation on each click
    $('#error-message').empty().slideUp().append(`<i class="fa-solid fa-triangle-exclamation"></i> Tweet tweet! Your tweeter is too heavy to fly, please lighten it so it can take to the air! <i class="fa-solid fa-triangle-exclamation"></i>`).slideDown();
  } else {
    //make an AJAX POST request (with jQuery) *LONGHAND*
    $.ajax({
      url: "/tweets", // define the url when youre submitting the request
      method: "POST", // whatever tweet is submitted will be posted to the server
      data: formData, // this comes from line 35 which holds the data between lines 70 and 80 in index.html
      success: function (response) {
        // if using shorthand .post, success can equate to the .then seen at line 55
        // when the post has successfully been submitted to the /tweet
        loadTweets();
        textContent.val("");
        $('.counter').text('140');
        $('#error-message').slideUp();
        console.log("Tweet submitted successfully:", response);
      },
      error: function (error) {
        // when the post has not successfully been submitted to the /tweet

        console.error("Error submitting tweet:", error);
      },
    });
  }
});

const loadTweets = function () {
  //make an AJAX GET request (with jQuery) *SHORTHAND*
  $.get("/tweets")
    .then((tweetData) => {
      // Clear the tweet container before loading new tweets
      $("#tweets-container").empty();
      // tweetData gives array of tweets
      renderTweets(tweetData); // loops through the array see line 9
    })
    .catch((error) => {
      console.log(`Error is: ${error.message}`);
    });
};

loadTweets();
