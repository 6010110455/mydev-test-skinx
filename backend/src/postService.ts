// postService.ts
interface Post {
  id: number;
  title: string;
  content: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch("http://localhost:5000/api/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts: Post[] = await response.json();
    return posts;
  } catch (error: any) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
}

export { getPosts };
