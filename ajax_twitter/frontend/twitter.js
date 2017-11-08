const FollowToggle = require('./follow_toggle.js');


document.addEventListener("DOMContentLoaded", function(event) {
  const $followToggleButtonEl = $('.follow-toggle');
  $followToggleButtonEl.each(function(index, el){
    new FollowToggle(el);
  });

});
