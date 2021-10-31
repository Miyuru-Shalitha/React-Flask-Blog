import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useHistory } from "react-router-dom";

function CreatePostPage({ match }) {
  const [isEdit, setIsEdit] = useState(false);

  const [post, setPost] = useState({
    id: "",
    title: "",
    subtitle: "",
    body: "",
    imgUrl: "",
  });

  const history = useHistory("");

  useEffect(() => {
    if (match.path === "/edit-post/:postId") {
      setIsEdit(true);

      fetch(`/api/post/${match.params.postId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const blogPost = data.blog_post;

          setPost({
            id: blogPost.id,
            title: blogPost.title,
            subtitle: blogPost.subtitle,
            body: blogPost.body,
            imgUrl: blogPost.img_url,
          });
        });
    }
  }, []);

  const createPost = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    };

    fetch("/api/create-post", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const editPost = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: post.title,
        subtitle: post.subtitle,
        body: post.body,
        img_url: post.imgUrl,
      }),
    };

    fetch(`/api/edit/${post.id}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          history.push(`/post/${post.id}`);
        }

        return response.json();
      })
      .then((data) => console.log(data));
  };

  const handleSavePost = (e) => {
    e.preventDefault();

    if (isEdit) {
      editPost();
    } else {
      createPost();
    }
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
            data={!isEdit ? "<p>Enter post content here.</p>" : post.body}
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
