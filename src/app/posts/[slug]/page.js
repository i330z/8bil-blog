import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import Image from "next/image";

// ✅ Generate static params for all .md posts
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const filenames = fs.readdirSync(postsDir);

  return filenames
    .filter((file) => file.endsWith(".md"))
    .map((filename) => ({
      slug: path.parse(filename).name,
    }));
}

// ✅ Generate metadata dynamically for each post
export async function generateMetadata({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "content", "posts", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Post not found",
      description: "This post could not be found.",
    };
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);
  const baseUrl = "https://www.8bil.com";

  return {
    title: data.title,
    description: data.description,
    authors: [{ name: data.author }],
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.featureImage,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.featureImage],
    },
    alternates: {
      canonical: `${baseUrl}/posts/${slug}`,
    },
  };
}

// ✅ Render single post page
export default function PostPage({ params }) {
  const { slug } = params || {};

  if (!slug) {
    return <div className="p-10 text-center text-red-500">❌ Invalid post slug</div>;
  }

  const filePath = path.join(process.cwd(), "content", "posts", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return <div className="p-10 text-center text-red-500">Post not found</div>;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  console.log(data);
  const htmlContent = marked(content);

  return (
    <article className="max-w-3xl mx-auto px-4 py-10 prose prose-lg">
      <div className="relative h-64 w-full">
        <Image
          src={data?.featureImage}
          alt={data?.title || "Feature image"}
          fill
          className="object-contain"
          priority
        />
      </div>

      <h1 className="text-4xl mb-2 py-20 capitalize font-semibold border-b-2 border-gray-200 border-dashed text-center">
        {data.title}
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        {new Date(data.date).toLocaleDateString()} — {data.author}
      </p>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

      <div className="border-t border-dashed border-2 border-gray-200"></div>

      {data.tags.map((tag, index) => (
        <Link key={index} href={`/tags/${tag}`} className="text-blue-500 hover:underline mr-2">
          #{tag}
        </Link>
      ))}
      <p className="mt-10">
        <a href="/" className="text-blue-600 hover:underline">
          ← Back to all posts
        </a>
      </p>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: data.title,
            description: data.description,
            image: data.featureImage,
            author: {
              "@type": "Person",
              name: data.author,
            },
            datePublished: data.date,
            dateModified: data.date,
            url: `https://www.8bil.com/posts/${slug}`,
            publisher: {
              "@type": "Organization",
              name: "8 Bil",
              logo: {
                "@type": "ImageObject",
                url: "https://www.8bil.com/logo.png",
              },
            },
          }),
        }}
      />

    </article>
  );
}
