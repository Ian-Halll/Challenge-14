const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Display all posts on dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.user_id 
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['createdAt', 'DESC']] 
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', { posts, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('newPost', { logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/new', withAuth, async (req, res) => {
  try {
    const newPostData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.session.user_id, 
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Display a single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('singlePost', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/delete/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/edit/:id', withAuth, async (req, res) => {
  try {
    const updatedPostData = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedPostData[0]) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit a post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('editPost', {
      post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;