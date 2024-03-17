/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

const createTweetElement = function (object) {
  const $tweet = $(`
  <article class="all-tweets">
    <header>
      <p class="user"><i class="user-icon fa-solid fa-user-astronaut"></i> ${tweetData.user.name}</p>
      <p class="user-id">${tweetData.user.handle}</p>
    </header>
    <p class="tweet-content">${tweetData.content.text}</p>
    <footer>
      <p>${tweetData.created_at}</p>
      <p class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
  </article>`);
  return $tweet;
};

const $tweet = createTweetElement(tweetData);

console.log($tweet);
  $("#tweets-container").append($tweet);

