import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Comment from "./Comment";

function PostPage({ currentUser }) {
  const history = useHistory("");

  const [post, setPost] = useState({
    id: "",
    date: "",
    author: { id: "", username: "" },
    title: "",
    subtitle: "",
    imgUrl: "",
    body: "",
  });

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const postId = history.location.pathname.split("/")[2];

    fetch(`/api/post/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const blogPost = data.blog_post;

        setPost({
          id: blogPost.id,
          date: blogPost.date,
          author: {
            id: blogPost.author.id,
            username: blogPost.author.username,
          },
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

    const postId = history.location.pathname.split("/")[2];

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: post.id, comment_text: commentText }),
    };

    fetch("/api/add-comment", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          setCommentText("");
          getComments(postId);
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

  const removeComment = (componentId) => {
    setComments((prevValue) => {
      const newCommentArray = [];
      prevValue.forEach((comment) => {
        if (comment.id !== componentId) {
          newCommentArray.push(comment);
        }
      });

      return newCommentArray;
    });
  };

  return (
    <div className="post">
      <div className="post__header">
        <img src={post.imgUrl} alt="Post image" className="post__image" />
        <a
          href={post.imgUrl}
          target="_blank"
          className="post__preview-image btn btn--primary"
        >
          Preview image
        </a>

        <div className="post__heading-text-container">
          <h1 className="heading-primary u-font-lg">{post.title}</h1>
          <h2 className="heading-secondary">{post.subtitle}</h2>

          <p>{post.author.username}</p>
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

        {currentUser?.id === post.author.id && (
          <div className="post__control-buttons">
            <button onClick={handleDeletePost} className="btn btn--danger">
              Delete
            </button>
            <Link to={`/edit-post/${post.id}`}>
              <button className="btn btn--green">Edit</button>
            </Link>
          </div>
        )}
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
              required
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
          {comments.map((comment, index) => (
            <Comment
              key={comment.id}
              componentId={index}
              comment={comment}
              currentUser={currentUser}
              removeComment={removeComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
