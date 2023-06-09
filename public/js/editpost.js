const editPost = async (event) => {
    event.preventDefault();
    
    if (event.target.matches('.edit-btn')) {
      const postId = event.target.getAttribute('data-id');
      document.location.href = `/dashboard/edit/${postId}`;
    }
  };
  
  document.addEventListener('click', editPost);