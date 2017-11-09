const APIUtil = require('./apiutil.js');

class FollowToggle {
  constructor(followToggleButtonEl) {
    this.$el = $(followToggleButtonEl);
    this.userId = this.$el.attr("data-user-id");
    this.followState = this.$el.attr("data-initial-follow-state");
    // console.log('before render');
    this.render();
    this.handleClick();
  }

  render(){
    console.log('in render');

    if (this.followState === "following" || this.followState === "unfollowing") {
      this.$el.prop('disabled', 'true');
    }

    if (this.followState === "followed") {
      this.$el.removeAttr("disabled");
      this.$el.text('Unfollow!');
    } else if (this.followState === "unfollowed"){
      this.$el.removeAttr("disabled");
      this.$el.text('Follow!');
    }
  }

  handleClick() {
    this.$el.on("click", event => {
      // const $button = $(event.currentTarget);
      event.preventDefault();
      let submitFollowRequest;
      if (this.followState === "followed") {
        this.followState = "unfollowing";
        submitFollowRequest = APIUtil.unfollowUser;
      } else {
        this.followState = "following";
        submitFollowRequest = APIUtil.followUser;
      }

      const fetchSuccess = () => {
        if (this.followState === "following") {
          this.followState = "followed";
        }
        if (this.followState === "unfollowing") {
          this.followState = "unfollowed";
        }
        this.render();
      };

      const fetchError = () => {
        console.log('return failed');
        if (this.followState === "following") {
          this.followState = "unfollowed";
        }
        if (this.followState === "unfollowing") {
          this.followState = "followed";
        }
        this.render();
      };
      // debugger;

      this.render();
      submitFollowRequest(this.userId).then(fetchSuccess).fail(fetchError);
    });
  }
}

module.exports = FollowToggle;
