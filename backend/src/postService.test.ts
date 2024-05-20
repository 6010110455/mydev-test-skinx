// postService.test.js
const { getPosts } = require("./postService");

describe("getPosts function", () => {
  test("fetches posts successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [
        { id: 1, title: "First post", content: "Lorem ipsum..." },
        { id: 2, title: "Second post", content: "Dolor sit amet..." },
      ],
      headers: { "content-type": "application/json" },
      ok: true,
      status: 200,
    });

    const posts = await getPosts();
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("First post");
    expect(posts[1].title).toBe("Second post");
  });

  test("handles fetch error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await expect(getPosts()).rejects.toThrow("Network error");
  });
});
