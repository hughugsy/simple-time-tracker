import Post from '../models/post';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import algoliasearch from 'algoliasearch';


/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.description || !req.body.post.duration || !req.body.post.time) {
    res.status(403).end();
  }

  const client = algoliasearch('H9TCHGEKHR', '7361639b8b90ab798fffbf86d8bac12c');
  const trackingsIndex = client.initIndex('trackings');

  trackingsIndex.addObject(req.body.post, (error, content) => {
    if (error) {
      console.log(error);
    } else {
      console.log('successfully indexed ', content);
    }
  });

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.description = sanitizeHtml(newPost.description);
  newPost.duration = sanitizeHtml(newPost.duration);
  newPost.time = sanitizeHtml(newPost.time);

  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
