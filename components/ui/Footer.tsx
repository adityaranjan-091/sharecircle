"use client";

import Link from "next/link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white/50 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer Content */}
        <div className="grid gap-8 py-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                <span className="text-sm font-bold">SC</span>
              </div>
              <div className="text-base font-bold tracking-tight">
                <span className="text-teal-700">Share</span>
                <span className="text-emerald-600">Circle</span>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Connecting neighbors, building community, and sharing resources.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/browse"
                  className="text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
                >
                  Browse Items
                </Link>
              </li>
              <li>
                <Link
                  href="/items/new"
                  className="text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
                >
                  List an Item
                </Link>
              </li>
              <li>
                <Link
                  href="/bookings"
                  className="text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              About
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
                >
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
                >
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="mailto:help@sharecircle.com"
                className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-teal-100 hover:text-teal-600 dark:text-zinc-400 dark:hover:bg-teal-950 dark:hover:text-teal-400"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-teal-100 hover:text-teal-600 dark:text-zinc-400 dark:hover:bg-teal-950 dark:hover:text-teal-400"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-teal-100 hover:text-teal-600 dark:text-zinc-400 dark:hover:bg-teal-950 dark:hover:text-teal-400"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-teal-100 hover:text-teal-600 dark:text-zinc-400 dark:hover:bg-teal-950 dark:hover:text-teal-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-zinc-100 py-6 dark:border-zinc-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              &copy; {currentYear} ShareCircle. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-zinc-600 transition-colors hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
