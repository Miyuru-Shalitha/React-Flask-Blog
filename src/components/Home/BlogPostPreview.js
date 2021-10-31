import React from "react";
import { Link } from "react-router-dom";

function BlogPostPreview({ post, getAllPosts }) {
  const handleDeletePost = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: post.id }),
    };

    fetch("/api/delete", requestOptions)
      .then((response) => {
        if (response.status === 204) {
          getAllPosts();
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
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
        {/* <div className="blog-preview__body">{post.body}</div> */}
        <div
          className="blog-preview__subtitle"
          dangerouslySetInnerHTML={{ __html: `${post.body}` }}
        />
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

        <div className="blog-preview__links-container">
          <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
            <button className="blog-preview__read-more-button">
              Read more
            </button>
          </Link>

          <button
            onClick={handleDeletePost}
            className="blog-preview__delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default BlogPostPreview;
