import React from "react";

function BlogPreview({ post }) {
  return (
    <div className="blog-preview">
      <div>
        <h2>{post.title}</h2>
        <h3>{post.subtitle}</h3>
        <p>{post.body}</p>
        <p>{post.author}</p>
        <p>{post.date}</p>
      </div>
    </div>
  );
}

export default BlogPreview;
