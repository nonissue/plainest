import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { MasonryLayout } from './MasonryLayout';

// Issues:
// - [x] Image doesn't move back properly (exit animation starts inside original container)
// - [ ] weird flash when closing (I think related to overlay ++ zIndex)
// - [ ] add next/prev
// - [ ] center images vertically
// - [ ] set point of interest
// - [ ] images on close are obscured by other grid images, will fix
// - [ ] fix image sizing finally...
// - [ ] disable scrolling when isSelected
// - [ ] fix grid flashing
// - [ ] adjust overlay timing, since grid post animation isn't a static time
//       because it varies based on distance
// - [ ] looks weird going behind header (zindex)
// - [ ] remove unused CSS
// = [ ] do components need to use react memo?
// - [ ] fix about
// - [ ] if we visit grid item directly, it fucks up zIndex aft

// const closeTween = { type: 'tween', duration: 0.5 };

export function MasonryGrid({ match, history }) {
  const [posts, setPosts] = useState([]);

  // cancel request if component unmounts?
  // https://www.leighhalliday.com/use-effect-hook
  useEffect(() => {
    // Should check last fetch, and if it is stale, run posts-hydrate
    const fetchData = async () => {
      const res = await axios('/.netlify/functions/posts-read-latest');
      const fetchedPosts = res.data.data.posts;
      setPosts(fetchedPosts);
    };

    try {
      fetchData();
    } catch (err) {
      console.log('Error occurred: ');
      console.log(err);
    }
  }, []);

  return (
    <MasonryLayout columns={1}>
      {!!posts &&
        posts.map(post => (
          <Post
            post={post}
            key={post.id}
            isSelected={match.params.id === post.id}
            history={history}
            width={post.width}
            height={post.height}
          />
        ))}
    </MasonryLayout>
  );
}

const Post = memo(
  ({ isSelected, history, post }) => {
    return (
      <div className="post" style={{}}>
        <Image
          id={post.id}
          isSelected={isSelected}
          src={post.src}
          // width={post.width}
          // height={post.height}
          caption={post.caption}
        />
        {!isSelected && <Link to={`posts/${post.id}`} className="post-open-link" />}
      </div>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected,
);

function Image({ isSelected, id, src, caption, height, width }) {
  return (
    // <div
    //   key={`post-${id}`}
    //   className={`post-image ${isSelected && 'open'}`}
    //   src={src}
    //   alt={caption}
    //   style={{
    //     background: `url(${src})`,
    //     height,
    //     backgroundSize: 'cover',
    //   }}
    // />
    <img
      key={`post-${id}`}
      className={`post-image ${isSelected && 'open'}`}
      src={src}
      alt={caption}
    />
  );
}

MasonryGrid.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

Image.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default MasonryGrid;
