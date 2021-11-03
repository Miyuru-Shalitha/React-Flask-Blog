import React, { useEffect, useState } from "react";

function Comment({ componentId, comment, currentUser, removeComment }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");

  useEffect(() => {
    setEditedCommentText(comment.text);
  }, [showEditForm]);

  const handleSubmitEditComment = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment_id: comment.id,
        edited_comment_text: editedCommentText,
      }),
    };

    fetch("/api/edit-comment", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUpdatedComment(data.updated_comment_text);
        setShowEditForm(false);
      });
  };

  const handleClickDelete = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment_id: comment.id,
      }),
    };

    fetch("/api/delete-comment", requestOptions)
      .then((response) => {
        if (response.status === 204) {
          removeComment(comment.id);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="comment">
      <div className="comment__profile-avatar-container">
        {/* <img
          className="comment__profile-avatar"
          src={comment.comment_author_profile_img_url}
          alt="Commented user profile photo"
        /> */}
      </div>

      {!showEditForm && (
        <p>{updatedComment != "" ? updatedComment : comment.text}</p>
      )}

      <div className="comment__details">
        <p className="comment__author">{comment.author}</p>
        {/* <p>Date</p> */}
      </div>

      {currentUser?.id === comment.comment_author.id && (
        <>
          {!showEditForm ? (
            <div className="comment__buttons-container">
              <button
                onClick={() => {
                  setShowEditForm(true);
                }}
                className="btn--small btn--green"
              >
                Edit
              </button>
              <button
                onClick={handleClickDelete}
                className="btn--small btn--danger"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="comment__edit-form">
              <form onSubmit={handleSubmitEditComment}>
                <textarea
                  name="commentText"
                  rows="4"
                  placeholder="Edit comment"
                  onChange={(e) => {
                    setEditedCommentText(e.target.value);
                  }}
                  value={editedCommentText}
                ></textarea>

                <div className="comment__edit-form-buttons-container">
                  <button type="submit" className="btn btn--small btn--primary">
                    Save
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      setShowEditForm(false);
                    }}
                    className="btn btn--small btn--outline-primary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Comment;
