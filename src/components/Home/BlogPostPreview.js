import React from "react";

function BlogPostPreview({ post }) {
  return (
    <div
      className="blog-preview"
      // style={{
      //   backgroundImage: `url(${post.img_url})`,
      //   backgroundPosition: "top",
      //   backgroundSize: "cover",
      // }}
    >
      <h2 className="blog-preview__title heading-secondary clr-primary">
        {post.title}
      </h2>
      <h3 className="blog-preview__subtitle">{post.subtitle}</h3>
      <p className="blog-preview__body">{post.body}</p>
      <div className="blog-preview__details">
        <p>Author: {post.author}</p>
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
  );
}

export default BlogPostPreview;
