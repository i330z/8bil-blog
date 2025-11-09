import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function HomePage() {
  // 👇 Correct path: points to src/content/posts
  const postsDir = path.join(process.cwd(),  "content", "posts");
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const slug = path.parse(filename).name;

      return {
        title: data.title,
        date: data.date,
        author: data.author,
        slug,
      };
    })
    // optional: sort newest first
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="border-b border-gray-200 pb-4 hover:bg-gray-50 rounded-lg transition"
          >
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-medium tracking-wider text-blue-600 hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()} — {post.author}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
