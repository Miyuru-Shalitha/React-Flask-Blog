import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function PostPage({ match }) {
  const [post, setPost] = useState({
    id: "",
    date: "",
    author: "",
    title: "",
    subtitle: "",
    imgUrl: "",
    body: "",
  });

  const history = useHistory("");

  useEffect(() => {
    fetch(`/api/post/${match.params.postId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const blogPost = data.blog_post;

        setPost({
          id: blogPost.id,
          date: blogPost.date,
          author: blogPost.author,
          title: blogPost.title,
          subtitle: blogPost.subtitle,
          imgUrl: blogPost.img_url,
          body: blogPost.body,
        });
      });
  }, []);

  const handleDeletePost = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: post.id }),
    };

    fetch("/api/delete", requestOptions)
      .then((response) => {
        if (response.status === 204) {
          history.push("/");
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

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

      <div className="post__buttons">
        <Link to="/">
          <button className="btn btn--primary">Back to homepage</button>
        </Link>

        <div className="post__control-buttons">
          <button onClick={handleDeletePost} className="btn btn--danger">
            Delete
          </button>
          <Link to={`/edit-post/${post.id}`}>
            <button className="btn btn--green">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
