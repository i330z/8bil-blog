import "./globals.css";
import Header from "@/components/navigation/Header";

export const metadata = {
  title: "Minimal Header Example",
  description: "Simple minimalistic header with TailwindCSS",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container mx-auto max-w-5xl">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
