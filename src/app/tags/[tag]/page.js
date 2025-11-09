import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const filenames = fs.readdirSync(postsDir);
  const tags = new Set();

  filenames.forEach((filename) => {
    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf8");
    const { data } = matter(fileContent);
    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tag) => tags.add(tag.toLowerCase()));
    }
  });

  return Array.from(tags).map((tag) => ({ tag }));
}

export default function TagPage({ params }) {
  const { tag } = params;
  const postsDir = path.join(process.cwd(), "content", "posts");
  const filenames = fs.readdirSync(postsDir);

  const filteredPosts = filenames
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data } = matter(fileContent);
      return { ...data, slug: filename.replace(/\.md$/, "") };
    })
    .filter((post) => post.tags?.map((t) => t.toLowerCase()).includes(tag));

  return (
    <div className="mx-auto max-w-2xl py-12">
      <h1 className="mb-8 text-center text-3xl font-bold capitalize text-zinc-800">
        Posts tagged with “{tag}”
      </h1>

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found for this tag.</p>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.slug} className="border-b border-zinc-200 pb-4">
              <Link
                href={`/posts/${post.slug}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()} — {post.author}
              </p>
              <p className="text-gray-600 mt-1">{post.description}</p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-10 text-center">
        <Link href="/tags" className="text-blue-600 hover:underline">
          ← Back to all tags
        </Link>
      </p>
    </div>
  );
}
