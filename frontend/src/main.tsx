import React, { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  postedAt: string;
  postedBy: string;
  tags: string[];
}

const HomePage: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "http://localhost:5000/api/posts",
          {
            params: { page, size, search },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [page, size, search]);

  const handleLoadMore = () => {
    setSize((prevSize) => prevSize + 10);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Home Page</h2>
          <div>
            {posts.map((post, index) => (
              <div key={index}>
                <p>
                  <strong>{post.title}</strong>
                </p>

                <p>
                  <strong>Posted By:</strong> {post.postedBy}
                </p>
                <p>
                  <strong>Posted At:</strong>{" "}
                  {new Date(post.postedAt).toLocaleString()}
                </p>
                <p>
                  <strong>Tags:</strong> {post.tags.join(", ")}
                </p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            ))}
          </div>
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      ) : (
        <h2>You are not authenticated. Please log in.</h2>
      )}
    </div>
  );
};

export default HomePage;
