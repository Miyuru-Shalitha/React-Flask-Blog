import React, { useState } from "react";

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
    <div>
      <h1>CREATE POST</h1>

      <form onSubmit={handleSavePost}>
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handlePostData}
          value={post.title}
        />
        <input
          type="text"
          placeholder="subtitle"
          name="subtitle"
          onChange={handlePostData}
          value={post.subtitle}
        />
        <input
          type="text"
          placeholder="content"
          name="body"
          onChange={handlePostData}
          value={post.body}
        />
        <input
          type="text"
          placeholder="image url"
          name="imgUrl"
          onChange={handlePostData}
          value={post.imgUrl}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
