import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <div className="w-full">
                <input
                  type="search"
                  id="default-search"
                  onChange={handleSearchChange}
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Title and Tag"
                  required
                />
              </div>
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-4 sm:mt-4 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start justify-between p-2 rounded-md hover:bg-gray-200"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <p className="text-gray-500">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(post.postedAt))}
                    </p>
                  </div>
                  <div className="group relative">
                    <div>
                      <div className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 cursor-pointer hover:underline">
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {post.tags.map((tag) => (
                      <div className="rounded-md bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-150">
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="relative mt-4 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <div className="font-semibold text-gray-900 flex">
                        <div className="mr-1">Post By :</div>
                        <div>{post.postedBy}</div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {posts.length > 9 && (
              <div className="fter:h-px my-10 flex items-center before:h-px before:flex-1  before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-1 h-4 w-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h2>You are not authenticated. Please log in.</h2>
      )}
    </div>
  );
};

export default HomePage;
