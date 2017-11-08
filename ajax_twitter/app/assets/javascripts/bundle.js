/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", function(event) {
  const $followToggleButtonEl = $('.follow-toggle');
  $followToggleButtonEl.each(function(index, el){
    new FollowToggle(el);
  });

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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
      const $button = $(event.currentTarget);
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
      };
      // debugger;

      this.render();
      submitFollowRequest(this.userId).then(fetchSuccess).fail(fetchError);
    });
  }
}

module.exports = FollowToggle;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax ({
      url: `http://localhost:3000/users/${id}/follow`,
      type: 'POST',
      dataType: 'json',
    });
  },

  unfollowUser: id => {
    return $.ajax ({
      url: `http://localhost:3000/users/${id}/follow`,
      type: 'DELETE',
      dataType: 'json',
    });
  }
};

module.exports = APIUtil;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map