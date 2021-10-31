import React from "react";
import { Link } from "react-router-dom";

function BlogPostPreview({ post }) {
  return (
    <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
      <div
        className="blog-preview"
        // style={{
        //   backgroundImage: `url(${post.img_url})`,
        //   backgroundPosition: "top",
        //   backgroundSize: "cover",
        // }}
      >
        <h2 className="blog-preview__title heading-secondary u-clr-primary">
          {post.title}
        </h2>
        <h3 className="blog-preview__subtitle">{post.subtitle}</h3>
        <p className="blog-preview__body">{post.body}</p>
        <div className="blog-preview__details">
          <p>Posted by: {post.author}</p>
          <p>Date: {post.date}</p>
        </div>
        <div className="blog-preview__image-container">
          <img
            className="blog-preview__image"
            src={post.img_url}
            alt="Post image"
          />
        </div>
      </div>
    </Link>
  );
}

export default BlogPostPreview;
