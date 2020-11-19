/*
 * Client-side JS logic
 * jQuery loaded
 */
$(document).ready(() => {

  const renderTweets = function(tweets) {
  //loops through the tweets
    for (const tweet of tweets) {
      //calls createTweetElement for each tweet
      const updateFeed = createTweetElement(tweet);
      //takes return value and appends it to the tweets container
      $('.tweet-target').prepend(updateFeed);
    }
  };

  const createTweetElement = function(tweet) {
    //Generates a DOM structure for a tweet
    let $tweet = $(`
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
          <p class="date">${moment(tweet.created_at).fromNow()}</p>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </footer>
      </article>`);
    return $tweet;
  };

  //Function to prevent XSS attacks
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  $('#down-button').click(function() {
    $('form').slideToggle('slow').css('display', 'flex');
    $('.error-message').empty();
  });

  $('form').on('submit', event => {
    event.preventDefault();
    
    //Emptying the section so any error message isn't shown twice on browser
    $('.error-message').empty();
    
    //Ensuring the tweet isn't too long
    if ($('#tweet-text').val().length > 140) {
      //Error message that is displayed
      $('.error-message').append('<p class="error-handler"><i class="fas fa-exclamation-triangle"></i>Too Long! Please shorten to less than 140 characters<i class="fas fa-exclamation-triangle"></i></p>').slideDown('slow');
    
    //Ensuring the tweet isn't empty or null
    } else if ($('#tweet-text').val() === '' || $('#tweet-text').val() === null) {
      //Error message that is displayed
      $('.error-message').append('<p class="error-handler"><i class="fas fa-exclamation-triangle"></i>Please enter a valid tweet<i class="fas fa-exclamation-triangle"></i></p>').slideDown('slow');

    //If all the criteria above passes, then the tweet will be added to the object in /tweets and rendered on the browser
    } else {
      //Removes the error message
      $('.error-handler').remove('.error-handler');
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('form').serialize()
      })
        .then(res => {
          //Clears the section to ensure no duplicates
          $('.tweet-target').empty();
          //Clears the text box after submitting a tweet
          $('#tweet-text').val('');
          //Resets the counter to 140 after submitting a tweet
          $('.counter').val(140);
          //Calls the loadTweets function
          loadTweets();
        });
    }
  });
});