// all helpers are exported through index.html line 46

// Escape function to prevent XSS
const escapeSymbol = function(str) {
  let div = document.createElement("div"); //create empty div
  div.appendChild(document.createTextNode(str)); // Append the string as a text node to the div we created
  return div.innerHTML; // Return the inner HTML of the div, effectively escaping any HTML symbols
};

const renderTweets = function(tweetArray) {
  for (let index of tweetArray) {
    const tweet = createTweetElement(index);
    // takes return value from createTweetelement functon and prpends (posts from earliest down to latest post) it to the tweets container
    $("#tweets-container").prepend(tweet);
  }
};

const randomNumberGen = (n) => {
  const number = Math.floor(Math.random(n) * 9) + 1;
  return number * 1000;
};

//FLAG HANDLER
$('#tweets-container').on("click", "i.flag", function() {
  const $flag = $(this);
  $flag.toggleClass("red-flag");
  const $spanFlag = $flag.siblings('.span-flag');
  if ($flag.hasClass("red-flag")) {
    $spanFlag.slideDown();
  } else {
    $spanFlag.slideUp();
  }
});

// RETWEET HANDLER
$("#tweets-container").on("click", "i.retweet", function() { 
  const $icon = $(this);
  const $count = $icon.siblings("span").eq(1); // Select the retweet count element
  let current = Number($count.text()); // Retrieve current valu of the text and make it a number
  // Increment the count when the button is clicked
  $count.text(current + 1);
});

  //LIKE HANDLER
  $("#tweets-container").on("click", "i.like", function() { 
    const $icon = $(this);
    const $count = $icon.siblings("span").eq(2); // Select the retweet count element
    let current = Number($count.text()); // Retrieve current valu of the text and make it a number
    // Increment the count when the button is clicked
    $count.text(current + 1);
  });

const createTweetElement = function(tweetObject) {

  const $tweet = $(`
  <article class="all-tweets">
    <header>
      <p class="user"><i class="user-icon fa-solid fa-user-astronaut"></i> ${escapeSymbol(
    tweetObject.user.name
  )}</p>
      <p class="user-id">${escapeSymbol(tweetObject.user.handle)}</p>
    </header>
    <p class="tweet-content">${escapeSymbol(tweetObject.content.text)}</p>
    <footer>
      <p>${timeago.format(tweetObject.created_at)}</p>
      <p class="icons"><span class="span-flag">Flagged!</span><i class="flag fa-solid fa-flag"></i><i class="retweet fa-solid fa-retweet"></i><span>${tweetObject.retweets || 0}</span><i class="like fa-solid fa-heart"></i><span>${tweetObject.likes || 0}</span></p>
    </footer>
  </article>`);


  // Check if the tweet content includes a hashtag
  if (tweetObject.content.text.includes("#") || tweetObject.content.text.includes("@")) {
    // Wrap the hashtag in a span with the hashtag class
    const $tweetContent = $tweet.find(".tweet-content");
    // Replace all occurrences of hashtags (\w+ matches any word character) with a span element
    // with the class "hashtag". The $1 in the replacement string is a placeholder for the matched
    // hashtag text.
    $tweetContent.html(
      $tweetContent
        .html()
        .replace(/(#|\@)(\w+)/g, '<span class="hashtag">$1$2</span>')
    );
  }

  return $tweet;
};


const loadTweets = function() {
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