import React, { useState } from "react";

function Comment({ comment, currentUser }) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="comment">
      <div className="comment__profile-avatar-container">
        {/* <img
          className="comment__profile-avatar"
          src={comment.comment_author_profile_img_url}
          alt="Commented user profile photo"
        /> */}
      </div>

      <p>{comment.text}</p>

      <div className="comment__details">
        <p className="comment__author">{comment.author}</p>
        {/* <p>Date</p> */}
      </div>

      {currentUser.id === comment.comment_author.id && (
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
              <button className="btn--small btn--danger">Delete</button>
            </div>
          ) : (
            <div className="comment__edit-form">
              <form>
                <textarea
                  name="commentText"
                  rows="4"
                  placeholder="Edit comment"
                ></textarea>

                <div className="comment__edit-form-buttons-container">
                  <button className="btn btn--small btn--primary">Save</button>
                  <button
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
