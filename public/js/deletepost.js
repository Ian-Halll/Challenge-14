const deletePost = async (event) => {
    event.preventDefault();
    
    if (event.target.matches('.delete-btn')) {
      const postId = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete post.');
      }
    }
  };
  
  document.addEventListener('click', deletePost);