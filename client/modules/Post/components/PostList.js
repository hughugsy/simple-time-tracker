import React, { PropTypes } from 'react';

// Import Components
import PostListItem from './PostListItem/PostListItem';

function PostList(props) {
  return (
    <div className="listView">
      {
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post.cuid}
          />
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
};

export default PostList;
