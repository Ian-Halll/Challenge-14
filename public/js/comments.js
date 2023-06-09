const handleCommentFormSubmit = async (event) => {
    event.preventDefault();
  
    // Get the comment body from the form
    const commentBody = document.querySelector('#comment-body').value.trim();
  
    // Get the post ID from the URL
    const postId = window.location.pathname.split('/').pop();
  
    if (commentBody) {
      try {
        // Send a POST request to create a new comment
        const response = await fetch(`/api/posts/${postId}/comments`, {
          method: 'POST',
          body: JSON.stringify({ body: commentBody }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If the comment is created successfully, reload the page to display the new comment
          location.reload();
        } else {
          alert('Failed to create comment.');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred while creating the comment.');
      }
    } else {
      alert('Please enter a comment.');
    }
  };
  
  // Event listener for comment form submission
  const commentForm = document.querySelector('#comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', handleCommentFormSubmit);
  }