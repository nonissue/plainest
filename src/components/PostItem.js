import React from "react";

export function PostItem({ post }) {
  return (
    <>
      <a href={post.link}>
        {post ? (
          <img src={post.images.standard_resolution.url} alt={post.caption} />
        ) : (
          ""
        )}
      </a>

      <p>{post.caption}</p>
    </>
  );
}
