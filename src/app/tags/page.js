import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function TagsPage() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const filenames = fs.readdirSync(postsDir);
  const allTags = new Set();

  filenames
    .filter((file) => file.endsWith(".md"))
    .forEach((filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag) => allTags.add(tag));
      }
    });

  const sortedTags = Array.from(allTags).sort();

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-zinc-800">
        All Tags
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {sortedTags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="rounded-lg bg-zinc-100 px-4 py-2 text-lg text-zinc-700 hover:bg-zinc-200"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
