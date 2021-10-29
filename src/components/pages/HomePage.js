import React, { useEffect } from "react";
import CreatePostPage from "./CreatePostPage";

function HomePage() {
  useEffect(() => {
    fetch("/api/all-posts")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h1>HOME PAGE</h1>
      {/* <CreatePostPage /> */}
    </div>
  );
}

export default HomePage;
