"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    // { name: "Posts", href: "/posts" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full  bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          8bil
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-gray-700">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-black transition-colors font-bold uppercase tracking-widest text-md"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col p-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-black"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
