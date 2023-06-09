const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.session.user_id,
        postId: req.body.postId,
      }, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Post,
            attributes: ['createdAt'],
          },
        ],
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // Create a new comment
router.post('/api/posts/:postId/comments', async (req, res) => {
  try {
    const newComment = await Comment.create({
      body: req.body.body,
      postId: req.params.postId,
      userId: req.session.user_id, 
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retrieve comments for a specific post
router.get('/api/posts/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.findAll({
      where: { postId },
    });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


module.exports = router;
