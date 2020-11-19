$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    // const tweetSpot = $(this)

    //Going up, then down the DOM tree to find where the counter is
    const locateCounter = $(this).parent().children('#below-txt-box').children('.counter');

    //Character counter, starts at 140 and decreases when the user types
    locateCounter.text(140 - $(this).val().length);
    
    //Changes the color if the tweet is too long
    if ($(this).val().length > 140) {
      locateCounter.css('color', 'red');
    } else {
      locateCounter.css('color', 'black');
    }
  });
});