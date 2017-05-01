$(document).ready(function(){

  $('#enterBtn').on('click', function() {
    $('.post').remove();
    var search = $('#subreddit').val();
    searchReddit('r/' + search);

  });

  $('.subredditName').click(function() {
    console.log('clicked');
    $('.post').remove();
    var search = $(this).text();
    searchReddit('r/' + search);

  });

  function searchReddit(subreddit) {
    if (subreddit == undefined) {
      subreddit = '';
    }
    $.get('http://www.reddit.com/' + subreddit + '.json').done(function (response) {

      for (var i = 0; i < response.data.children.length; i++) {
        var title = response.data.children[i].data.title;
        var url = response.data.children[i].data.url;
        var redditLink = response.data.children[i].data.permalink;
        var thumbnail = response.data.children[i].data.thumbnail;
        var score = response.data.children[i].data.score;
        var subreddit = response.data.children[i].data.subreddit;

        var newPost = "<div class='post'>" +
        '<a class="subredditName"> r/' + subreddit + '</a>' +
        '<h3><a href="http://reddit.com' + redditLink +'">' + title + '</a></h3>' +
        '<a class="thumbnail" href=' + url + '><img id="img' + i + '" src=' + thumbnail + '><a>' +
        '<p>' + score + ' points</p>' ;
        $('#postDest').append(newPost);
      }
    }).fail(function () {
      $('#postDest').append("404 SUBREDDIT NOT FOUND");
    });
  }

  searchReddit();

  var $img = $('img');

  $img.on('load', function(){
    console.log($(this).width());
  });



});
