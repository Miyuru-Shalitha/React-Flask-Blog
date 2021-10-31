import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogPostPreview from "./BlogPostPreview";

function HomePage({ state }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/all-posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.all_blog_posts);
        console.log(posts);
      });
  }, []);

  return (
    <div className="home">
      {state.isLoggedIn && (
        <Link to="/create-post">
          <button className="btn btn--white">+ Create new post</button>
        </Link>
      )}

      {posts.map((post) => (
        <BlogPostPreview key={post.id} post={post} />
      ))}
    </div>
  );
}

export default HomePage;
