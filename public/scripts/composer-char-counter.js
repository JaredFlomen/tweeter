$(document).ready(function() {
  $('#tweet-text').keyup(function () {
    const tweetSpot = $(this)
    const locateCounter = tweetSpot.parent().children('#below-txt-box').children('.counter')

    locateCounter.text(140 - tweetSpot.val().length)
    
    if (tweetSpot.val().length > 140) {
      locateCounter.css('color', 'red');
    } else {
      locateCounter.css('color', 'black')
    }

  });
});