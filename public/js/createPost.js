document.addEventListener('DOMContentLoaded', () => {
  const createPost = async (event) => {
    event.preventDefault();

    const titleInput = document.querySelector('#post-title');
    const contentInput = document.querySelector('#post-content');

    const title = titleInput.value;
    const content = contentInput.value;

    if (!title || !content) {
      alert('Please enter both title and content.');
      return;
    }

    try {
      const response = await fetch('/createPost', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        location.reload(); // Reload the page to update the dashboard
      } else {
        alert('Failed to create post.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while creating the post.');
    }
  };

  const createPostForm = document.querySelector('#create-post-form');
  if (createPostForm) {
    createPostForm.addEventListener('submit', createPost);
  }
});