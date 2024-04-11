$(document).ready(function() {
    // Function to handle submitting a new comment
    $('#postComment').on('click', function() {
      var userName = $('#userName').val().trim();
      var userComment = $('#userComment').val().trim();
  
      if (userName === '' || userComment === '') {
        alert('Please enter your name and comment.');
        return;
      }
  
      // AJAX request to send comment data to the server
      $.ajax({
        type: 'POST',
        url: '/comments',
        data: {
          userName: userName,
          userComment: userComment
        },
        success: function(response) {
          // Add the new comment to the UI
          addCommentToUI(response);
          $('#userName').val('');
          $('#userComment').val('');
        },
        error: function(error) {
          console.log('Error:', error);
        }
      });
    });
  
    // Function to add a new comment to the UI
    function addCommentToUI(comment) {
      var commentCard = $('<div class="comment-card"></div>').attr('data-comment-id', comment._id);
      var commentContent = $('<div></div>');
      commentContent.append(`<h3>${comment.userName}</h3>`);
      commentContent.append(`<p>${comment.userComment}</p>`);
      commentContent.append(`<button class="reply-btn">Reply</button>`);
  
      var commentReply = $('<div class="comment-reply"></div>');
      commentReply.append(`<input type="text" placeholder="Your Name">`);
      commentReply.append(`<textarea placeholder="Leave a reply..."></textarea>`);
      commentReply.append(`<button class="btn btn-primary">Submit Reply</button>`);
  
      commentCard.append(commentContent);
      commentCard.append(commentReply);
  
      $('#commentsList').append(commentCard);
    }
  
    // Function to fetch comments from the server on page load
    function fetchComments() {
      $.get('/comments', function(comments) {
        comments.forEach(function(comment) {
          addCommentToUI(comment);
        });
      });
    }
  
    // Call the fetchComments function when the page loads
    fetchComments();
  });
  