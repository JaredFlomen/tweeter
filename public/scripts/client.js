/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

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
  //Generates a DOM structure for a tweet
  let $tweet2 = $(`
  <article class="tweet">
    <header>
      <img src="${tweet.user.avatars}" height="40"> 
      <p>${tweet.user.name}</p>
      <p class="username">${tweet.user.handle}</p>
    </header>
    <p class="content">
      ${escape(tweet.content.text)}
    </p>
    <footer>
      <p class="date">${tweet.created_at}</p>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </footer>
  </article>`);
  return $tweet2;
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//GET request to load the initial tweets stored in intial-tweets.js
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
  })
  .then(res => {
    renderTweets(res);
  });
}

loadTweets();

  $('form').on('submit', event => {
    event.preventDefault()
    
    //Ensuring the tweet isn't too long
    if ($('#tweet-text').val().length > 140 ) {
      // alert("The Tweet is Too Long")
      $('.error-message').append('<p class="error-handler"><i class="fas fa-exclamation-triangle"></i>Too Long! Please shorten to less than 140 characters<i class="fas fa-exclamation-triangle"></i></p>')
    
    //Ensuring the tweet isn't empty 
    } else if ($('#tweet-text').val() === '' || $('#tweet-text').val() === null) {
      // alert("Please enter a valid tweet")
      $('.error-message').append('<p class="error-handler"><i class="fas fa-exclamation-triangle"></i>Please enter a valid tweet<i class="fas fa-exclamation-triangle"></i></p>')

    //If all the criteria above passes, then the tweet will be added to the object in /tweets and rendered on the browser
    } else {
      $('.error-handler').remove('.error-handler')
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('form').serialize()
      })
      .then(res => {
        $('.tweet-target').empty()
        loadTweets();
      })
    }
  })
})