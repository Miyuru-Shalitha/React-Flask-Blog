import React, { useEffect } from "react";
import CreatePostPage from "./CreatePostPage";
import Header from "../Header";

function HomePage() {
  useEffect(() => {
    fetch("/api/all-posts")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1>HOME PAGE</h1>
      {/* <CreatePostPage /> */}
    </>
  );
}

export default HomePage;
