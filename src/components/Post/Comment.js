import React from "react";

function Comment() {
  return (
    <div className="comment">
      <div className="comment__profile-avatar-container">
        <img
          className="comment__profile-avatar"
          src="https://yt3.ggpht.com/ytc/AKedOLSydG7HMhw3XvSQgOHZsd7wlbi5Z6LQWudhrA3L=s88-c-k-c0x00ffffff-no-rj"
          alt="Commented user profile photo"
        />
      </div>

      <p>
        Comment Text sdfhksdf skdfhsdkfjsdhfsdf sdkfhsdkf sdkfhsdf
        ksjdfhskdfjsdhf sdfh sdf shdkfsdkf sdfhksd fjhsdkf sdfsdkfhsd fdfs.
        Comment Text sdfhksdf skdfhsdkfjsdhfsdf sdkfhsdkf sdkfhsdfsdfsdfsdff
        Comment Text sdfhksdf skdfhsdkfjsdhfsdf sdkfhsdkf sdkfhsdfsdfsd
        ksjdfhskdfjsdhf sdfh sdf shdkfsdkf sdfhksd fjhsdkf sdfsdkfhsd
        fdfs.sdfsdf Comment Text sdfhksdf skdfhsdkfjsdhfsdf sdkfhsdkf sdkfhsdf
        ksjdfhskdfjsdhf sdfh sdf shdkfsdkf sdfhksd fjhsdkf sdfsdkfhsd fdfs.sdf
        Comment Text sdfhksdf skdfhsdkfjsdhfsdf sdkfhsdkf sdkfhsdfsdfsdf
        ksjdfhskdfjsdhf sdfh sdf shdkfsdkf sdfhksd fjhsdkf sdfsdkfhsd fdfs.
      </p>

      <div className="comment__details">
        <p className="comment__author">Comment Author</p>
        <p>Date</p>
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
