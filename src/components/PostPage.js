import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostPage({ match }) {
  const [post, setPost] = useState({
    date: "",
    author: "",
    title: "",
    subtitle: "",
    imgUrl: "",
    body: "",
  });

  useEffect(() => {
    fetch(`/api/post/${match.params.postId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const blogPost = data.blog_post;

        setPost({
          date: blogPost.date,
          author: blogPost.author,
          title: blogPost.title,
          subtitle: blogPost.subtitle,
          imgUrl: blogPost.img_url,
          body: blogPost.body,
        });
      });
  }, []);

  return (
    <div className="post">
      <div className="post__header">
        <img src={post.imgUrl} alt="Post image" className="post__image" />

        <div className="post__heading-text-container">
          <h1 className="heading-primary u-font-lg">{post.title}</h1>
          <h2 className="heading-secondary">{post.subtitle}</h2>

          <p>{post.author}</p>
          <p>{post.date}</p>
        </div>
      </div>

      {/* <p>{post.body}</p> */}
      <div
        className="post__body"
        dangerouslySetInnerHTML={{ __html: `${post.body}` }}
      />

      <Link to="/">
        <button className="post__back-button btn btn--white">
          Back to homepage
        </button>
      </Link>
    </div>
  );
}

export default PostPage;
