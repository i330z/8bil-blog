import "./globals.css";
import Header from "@/components/navigation/Header";


export const metadata = {
  title: "8bil — Exploring Technology, Programming, AI & Machine Learning",
  description:
    "8bil.com is a digital publication that explores technology, programming, artificial intelligence, and machine learning — delivering insightful articles, tutorials, and analysis for the modern tech mind.",
  keywords: [
    "technology blog",
    "AI tutorials",
    "machine learning guides",
    "programming articles",
    "tech insights",
    "software development",
    "artificial intelligence news",
    "data science",
    "coding tips",
    "tech trends",
  ],
  authors: [{ name: "8bil Team", url: "https://www.8bil.com" }],
  openGraph: {
    title: "8bil — Exploring Technology, Programming, AI & Machine Learning",
    description:
      "Join 8bil.com for deep dives into technology, programming, and artificial intelligence — where innovation meets insight.",
    url: "https://www.8bil.com",
    siteName: "8bil",
    images: [
      {
        url: "/feature-image.jpg", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "8bil — Tech, Programming, and AI Insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "8bil — Exploring Technology, Programming, AI & Machine Learning",
    description:
      "8bil.com publishes engaging articles about technology, AI, programming, and innovation.",
    creator: "@8bilproject", 
    images: ["/feature-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://www.8bil.com"),
  alternates: {
    canonical: "https://www.8bil.com",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container mx-auto max-w-5xl" >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
