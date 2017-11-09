const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');


document.addEventListener("DOMContentLoaded", function(event) {
  const $followToggleButtonEl = $('.follow-toggle');
  $followToggleButtonEl.each(function(index, el){
    new FollowToggle(el);
  });

  const $usersSearchEl = $(".users-search");
  $usersSearchEl.each(function(index, el) {
    new UsersSearch(el);
  });

});
