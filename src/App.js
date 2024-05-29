import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Spinner from "./components/Spinner";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(5);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  function handleLoadMore() {
    setVisible((prevVisible) => prevVisible + 5);
  }

  function Blogs() {
    if (isLoading || !isLoaded) {
      return <Spinner />;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (posts.length === 0) {
      return <div>No posts currently</div>;
    }

    return (
      <div className="min-[1300px]:px-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {posts.slice(0, visible).map((post) => {
          return (
            <div
              key={post.id}
              className="shadow-lg p-4 w-[300px] min-[950px]:w-[400px] rounded-sm mx-auto sm:rounded-md bg-white"
            >
              <h2 className="text-sm font-bold ">{post.title}</h2>
              <p className="text-xs">{post.body}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mx-auto py-6">
      <h1 className="text-md font-bold ml-4 mb-8">Latest News</h1>
      <Blogs />
      <button
        className="text-md font-bold ml-4 mt-6 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </div>
  );
}

export default App;
