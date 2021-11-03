import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Comment from "./Comment";

function PostPage({ match }) {
  const history = useHistory("");

  const [post, setPost] = useState({
    id: "",
    date: "",
    author: "",
    title: "",
    subtitle: "",
    imgUrl: "",
    body: "",
  });

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");

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

        getComments(blogPost.id);
      });
  }, []);

  const getComments = (postId) => {
    fetch(`/api/post/${postId}/get-comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      });
  };

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

  const handleSubmitComment = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: post.id, comment_text: commentText }),
    };

    fetch("/api/add-comment", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          setCommentText("");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleChangeComment = (e) => {
    setCommentText(e.target.value);
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

      <hr />

      <div className="comment-section">
        <div className="comment-section__heading">
          <h1 className="comment-section__heading-text">COMMENTS</h1>

          <form
            className="comment-section__comment-form"
            onSubmit={handleSubmitComment}
          >
            <textarea
              name="comment"
              rows="4"
              placeholder="Add a comment"
              onChange={handleChangeComment}
              value={commentText}
            ></textarea>

            <div className="comment-section__form-buttons-container">
              <button className="btn btn--primary" type="submit">
                Save
              </button>
              <button
                className="btn btn--outline-primary"
                type="reset"
                onClick={() => {
                  setCommentText("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="comment-section__comments">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
