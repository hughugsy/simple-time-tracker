import React, { PropTypes } from 'react';
import { Link } from 'react-router';


// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link >
          {props.post.description}
        </Link>
      </h3>
      <p className={styles['author-name']}>{props.post.duration}</p>
      <p className={styles['post-desc']}>{props.post.time}</p>
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostListItem;
