const APIUtil = require('./apiutil.js');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.input = this.$el.find("input");
    this.ul = this.$el.find("ul");
    this.handleInput();
  }

  handleInput() {
    this.input.on("input", e => {
      e.preventDefault();
      const $input = $(e.currentTarget);
      const query = $input.val();

      const fetchSuccess = () => {
        console.log('Success!');
      };


      APIUtil.searchUsers(query, this.renderResults.bind(this));
    });


  }

  renderResults(resultArray){
    console.log(resultArray);
    this.ul.empty();
    console.log(resultArray);
    resultArray.forEach((el) => {
      const $userLi = $("<li></li>");
      $userLi.text(el.username);
      this.ul.append($userLi);
    });
  }
 }

module.exports = UsersSearch;
