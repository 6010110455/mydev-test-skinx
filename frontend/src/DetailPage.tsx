// src/pages/DetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  postedAt: string;
  postedBy: string;
  tags: string[];
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="my-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 cursor-pointer hover:underline">
          {post.title}
        </div>

        <div
          className="my-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex items-center gap-x-4">
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
      </div>
    </div>
  );
};

export default DetailPage;
