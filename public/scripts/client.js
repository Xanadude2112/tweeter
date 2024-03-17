/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Hubert",
      "handle": "@HJFarnsworth"
    },
    "content": {
      "text": "Futurama cracks me up all the time <span>#bitemyshinymetalass🤖</span>" 
    },
    "created_at": "1 hour ago"
  },
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants" 
    },
    "created_at": 1461116232227 
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweetArray) {
  for(let index of tweetArray){
    const tweet = createTweetElement(index);
    // takes return value from createTweetelement functon and appends it to the tweets container
    $("#tweets-container").append(tweet);
  }
}

const createTweetElement = function (tweetObject) {
  const $tweet = $(`
  <article class="all-tweets">
    <header>
      <p class="user"><i class="user-icon fa-solid fa-user-astronaut"></i> ${tweetObject.user.name}</p>
      <p class="user-id">${tweetObject.user.handle}</p>
    </header>
    <p class="tweet-content">${tweetObject.content.text}</p>
    <footer>
      <p>${tweetObject.created_at}</p>
      <p class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
  </article>`);
  return $tweet;
};

renderTweets(data);