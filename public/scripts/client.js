/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
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

const renderTweets = function(tweets) {
  //loops through the tweets
  for (const tweet of tweets) {
    //calls createTweetElement for each tweet
    const updateFeed = createTweetElement(tweet);
    //takes return value and appends it to the tweets container
    $('.tweet-target').append(updateFeed)
  }
}

const createTweetElement = function(tweet) {
  let $tweet = $(`
  <article class="tweet">
    <header>
      <img src="${tweet.user.avatars}" height="40"> 
      <p>${tweet.user.name}</p>
      <p clas="username">${tweet.user.handle}</p>
    </header>
    <p class="content">
      ${tweet.content.text}
    </p>
    <footer>
      <p class="date">${tweet.created_at}</p>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </footer>
  </article>`);
  return $tweet;
}

renderTweets(data);