import React, { useEffect, useState } from "react";
import BlogPreview from "./BlogPreview";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/all-posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.all_blog_posts));
  }, []);

  return (
    <div className="home">
      {posts.map((post) => (
        <BlogPreview key={post.id} post={post} />
      ))}
    </div>
  );
}

export default HomePage;
