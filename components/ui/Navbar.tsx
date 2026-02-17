"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useUser } from "@/components/UserProvider";
import {
  CircleDot,
  Plus,
  ClipboardList,
  LogIn,
  LogOut,
  User,
  Info,
  HelpCircle,
  Home,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPendingLenderCount } from "@/actions/booking";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#about", label: "About", icon: Info },
  { href: "/#faqs", label: "FAQs", icon: HelpCircle },
  { href: "/browse", label: "Browse", icon: CircleDot },
  { href: "/items/new", label: "List Item", icon: Plus },
  { href: "/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/history", label: "History", icon: History },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, loading } = useUser();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      if (currentUser) {
        const count = await getPendingLenderCount(currentUser._id);
        setPendingCount(count);
      }
    }
    fetchCount();
  }, [currentUser, pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 shadow-sm shadow-zinc-200/30 backdrop-blur-2xl dark:border-zinc-800/60 dark:bg-zinc-950/80 dark:shadow-zinc-900/30">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300 hover:opacity-90"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-[3px] shadow-lg shadow-teal-500/20 ring-1 ring-teal-400/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-teal-500/30 group-hover:ring-teal-400/50 dark:from-teal-600 dark:to-emerald-700 dark:shadow-teal-800/30 dark:ring-teal-700/40">
            <div className="rounded-[13px] bg-white p-1 dark:bg-zinc-900">
              <Image
                src="/logo.png"
                alt="ShareCircle Logo"
                width={34}
                height={34}
                className="rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight leading-none">
              <span className="bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-500">
                Share
              </span>
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-500">
                Circle
              </span>
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
              Community Sharing
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-0.5 rounded-2xl bg-zinc-100/70 p-1 ring-1 ring-zinc-200/50 dark:bg-zinc-800/50 dark:ring-zinc-700/30 md:flex">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-white text-teal-700 shadow-sm shadow-zinc-200/50 ring-1 ring-zinc-200/80 dark:bg-zinc-800 dark:text-teal-400 dark:shadow-none dark:ring-zinc-700/80"
                    : "text-zinc-500 hover:bg-white/70 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-200",
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 transition-colors duration-200",
                    isActive
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-zinc-400 dark:text-zinc-500",
                  )}
                />
                <span className="relative">
                  {label}
                  {label === "Bookings" && pendingCount > 0 && (
                    <span className="absolute -right-5 -top-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-zinc-900">
                      {pendingCount}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="hidden space-y-1.5 sm:block">
                <div className="h-3 w-16 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-2.5 w-12 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800/60" />
              </div>
            </div>
          ) : currentUser ? (
            <>
              {/* User info */}
              <div className="hidden items-center gap-2.5 rounded-2xl bg-zinc-50/80 px-3 py-2 ring-1 ring-zinc-200/60 transition-colors duration-200 hover:bg-zinc-100/60 dark:bg-zinc-900/80 dark:ring-zinc-800/60 dark:hover:bg-zinc-800/40 sm:flex">
                <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-sm font-bold text-white shadow-md shadow-teal-500/20 ring-2 ring-white dark:ring-zinc-900">
                  {currentUser.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentUser.image}
                      alt={currentUser.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    currentUser.name?.charAt(0).toUpperCase()
                  )}
                  {/* online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-900" />
                </div>
                <div className="text-sm leading-tight">
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      {currentUser.credits}
                    </span>{" "}
                    credits
                  </p>
                </div>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white px-3.5 py-2 text-sm font-medium text-zinc-600 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-red-100/50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/auth/login"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-600 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
              <Link
                href="/auth/signup"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 hover:from-teal-700 hover:to-emerald-700 hover:shadow-xl hover:shadow-teal-600/30 active:scale-[0.97]"
              >
                <User className="h-3.5 w-3.5" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="flex items-center justify-around border-t border-zinc-100/80 bg-white/60 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl dark:border-zinc-800/80 dark:bg-zinc-950/60 sm:hidden">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-2 py-2.5 text-[10px] font-medium transition-colors duration-200",
                isActive
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-zinc-400 active:text-zinc-600 dark:text-zinc-500 dark:active:text-zinc-300",
              )}
            >
              {isActive && (
                <span className="absolute -top-px left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400" />
              )}
              <Icon
                className={cn(
                  "h-[18px] w-[18px] transition-all duration-200",
                  isActive && "drop-shadow-sm",
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="relative">
                {label}
                {label === "Bookings" && pendingCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-1 ring-white dark:ring-zinc-900 animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}