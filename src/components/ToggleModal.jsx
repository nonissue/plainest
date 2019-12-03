<ToggleModal
  toggle={show => (
    <Link
      to={{
        pathname: `/images/${post.id}`,
        state: { background: location },
      }}
      onClick={show}
      onKeyDown={show}
    >
      <img
        alt={post.caption}
        key={post.id}
        src={post.src}
        width={post.width}
        style={{ zIndex: 0 }}
      />
    </Link>
  )}
  content={hide => (
    <button type="button" className="post-modal" onClick={hide} onKeyDown={hide}>
      <div>
        <img
          // whileHover="hover"
          // variants={imageVariants}
          alt={post.caption}
          key={post.id}
          src={post.src}
          // transition={{ type: 'tween', stiffness: 0 }}
          width={post.width}
        />
        <p>{post.caption}</p>
      </div>
      {/* <button onClick={hide}>Close</button> */}
    </button>
  )}
/>;
