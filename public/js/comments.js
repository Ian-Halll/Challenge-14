const handleCommentFormSubmit = async (event) => {
    event.preventDefault();
  
    // Get the comment body from the form
    const commentBody = document.querySelector('#comment-body').value.trim();
  
    // Get the post ID from the URL
    const postId = window.location.pathname.split('/').pop();
  
    if (commentBody) {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`, {
          method: 'POST',
          body: JSON.stringify({ body: commentBody }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
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
  
  const commentForm = document.querySelector('#comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', handleCommentFormSubmit);
  }