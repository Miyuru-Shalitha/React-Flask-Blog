import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CreatePostPage() {
  const [post, setPost] = useState({
    title: "",
    subtitle: "",
    body: "",
    imgUrl: "",
  });

  const handleSavePost = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    };

    fetch("/api/create-post", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handlePostData = (e) => {
    const { name, value } = e.target;

    setPost((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <div className="create-post">
      <form className="create-post__form" onSubmit={handleSavePost}>
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handlePostData}
          value={post.title}
          required
        />
        <input
          type="text"
          placeholder="subtitle"
          name="subtitle"
          onChange={handlePostData}
          value={post.subtitle}
          required
        />
        {/* <input
          type="text"
          placeholder="content"
          name="body"
          onChange={handlePostData}
          value={post.body}
        /> */}
        <input
          type="text"
          placeholder="image url"
          name="imgUrl"
          onChange={handlePostData}
          value={post.imgUrl}
          required
        />

        <div>
          <CKEditor
            editor={ClassicEditor}
            data="<p>Enter post content here.</p>"
            onChange={(event, editor) => {
              const data = editor.getData();
              setPost((prevValue) => ({
                ...prevValue,
                body: data,
              }));
            }}
          />
        </div>

        <button type="submit" className="btn btn--primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
