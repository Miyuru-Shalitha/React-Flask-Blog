import React from "react";

function Comment({ comment }) {
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

      {/* <div className="comment__buttons-container">
        <button className="btn--small btn--green">Edit</button>
        <button className="btn--small btn--danger">Delete</button>
      </div> */}

      <div className="comment__edit-form">
        <form>
          <textarea
            name="commentText"
            rows="4"
            placeholder="Edit comment"
          ></textarea>

          <button className="btn btn--small btn--primary">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Comment;
