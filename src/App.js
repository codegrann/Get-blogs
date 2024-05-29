import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Spinner from "./components/Spinner";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lat, setLat] = useState(0);

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

  function Blogs() {
    if (isLoading || !isLoaded) {
      return <Spinner />;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (posts.length === 0) {
      return <div>No posts found</div>;
    }

    return (
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id} className="shadow-lg p-4 w-[300px] mx-auto">
              <h2 className="text-sm font-bold ">{post.title}</h2>
              <p className="text-xs">{post.body}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-gray-200 mx-auto">
      <h1 className="text-md font-bold ml-4">Latest News</h1>
      <Blogs />
    </div>
  );
}

export default App;
