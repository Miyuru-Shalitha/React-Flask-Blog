import React, { useEffect, useState } from "react";
import BlogPostPreview from "./BlogPostPreview";

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
        <BlogPostPreview key={post.id} post={post} />
      ))}
    </div>
  );
}

export default HomePage;
