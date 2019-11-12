import React from "react";
import { Link } from "react-router-dom";

// cancel request if component unmounts?
// https://www.leighhalliday.com/use-effect-hook

export function InstaGrid({ posts }) {
  return (
    <div className="image-grid">
      {console.log("posts", posts)}
      {!!posts &&
        posts.map(post => (
          <div key={post.id}>
            {(() => {
              if (post.images) {
                return (
                  <Link
                    to={"/images?src=" + post.images.standard_resolution.url}
                  >
                    <img
                      src={post.images.standard_resolution.url}
                      alt={post.caption}
                    />
                  </Link>
                );
              }
              return null;
            })()}
          </div>
        ))}
    </div>
  );
}

export default InstaGrid;
// export default InstaGrid;
