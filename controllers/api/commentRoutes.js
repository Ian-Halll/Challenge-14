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


module.exports = router;
