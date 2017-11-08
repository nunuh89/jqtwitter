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
