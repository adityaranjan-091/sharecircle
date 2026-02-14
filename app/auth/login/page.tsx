"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { loginUser, loginWithGoogle } from "@/actions/auth";
import Button from "@/components/ui/Button";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebaseClient";
import { signInWithPopup } from "firebase/auth";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);

    if (result && !result.success) {
      setError(result.error || "Login failed");
      window.location.href = "/";
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const loginResult = await loginWithGoogle(idToken);

      if (loginResult && !loginResult.success) {
        setError(loginResult.error || "Google sign-in failed");
        setGoogleLoading(false);
      } else {
        window.location.href = "/";
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/popup-blocked") {
        setError(
          "Popup was blocked. Please allow popups for this site and try again.",
        );
      } else if (code === "auth/popup-closed-by-user") {
        // User closed popup, no error needed
      } else {
        console.error("Google sign-in error:", err);
        setError("Google sign-in failed");
      }
      setGoogleLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 animate-pulse rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-400/5" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 animate-pulse rounded-full bg-cyan-400/10 blur-3xl delay-1000 dark:bg-cyan-400/5" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 animate-pulse rounded-full bg-emerald-400/10 blur-3xl delay-500 dark:bg-emerald-400/5" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="relative rounded-3xl border border-zinc-200/80 bg-white/80 px-8 py-10 shadow-2xl shadow-zinc-200/50 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:shadow-zinc-900/50 sm:px-10 sm:py-12">
          {/* Decorative top gradient bar */}
          <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-t-3xl">
            <div className="h-full w-full bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500" />
          </div>

          {/* Header with real logo */}
          <div className="mb-8 text-center">
            <div className="group relative mx-auto flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 opacity-20 blur-lg transition-all duration-500 group-hover:opacity-40 group-hover:blur-xl" />
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl shadow-lg shadow-teal-500/30 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="ShareCircle Logo"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <Sparkles className="h-3.5 w-3.5 text-teal-500" />
              Sign in to your ShareCircle account
            </p>
          </div>

          {/* Google Sign In — Professional Style */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="group relative flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600 dark:focus:ring-offset-zinc-900"
          >
            {googleLoading ? (
              <svg
                className="h-5 w-5 animate-spin text-zinc-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              <GoogleIcon className="h-5 w-5" />
            )}
            <span>{googleLoading ? "Signing in…" : "Sign in with Google"}</span>
          </button>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-700/70" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-white/80 px-3 text-zinc-400 backdrop-blur-sm dark:bg-zinc-900/80 dark:text-zinc-500">
                or sign in with email
              </span>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleCredentials} className="space-y-4">
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3.5 text-sm text-red-700 backdrop-blur-sm dark:border-red-800/60 dark:bg-red-900/20 dark:text-red-400">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                  <span className="text-xs font-bold">!</span>
                </div>
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className={`text-sm font-medium transition-colors duration-200 ${
                  focusedField === "email"
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                Email
              </label>
              <div className="group relative">
                <Mail
                  className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "email"
                      ? "text-teal-500"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-3 pl-11 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-teal-500 focus:bg-white focus:shadow-sm focus:shadow-teal-500/10 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-teal-500 dark:focus:bg-zinc-800"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-teal-600 transition-colors duration-200 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="group relative">
                <Lock
                  className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-teal-500"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-3 pl-11 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-teal-500 focus:bg-white focus:shadow-sm focus:shadow-teal-500/10 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-teal-500 dark:focus:bg-zinc-800"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                loading={loading}
                className="group w-full rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 py-3 text-sm font-semibold shadow-lg shadow-teal-500/25 transition-all duration-300 hover:from-teal-600 hover:to-emerald-700 hover:shadow-xl hover:shadow-teal-500/30 active:scale-[0.98]"
              >
                Sign In
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-teal-600 underline-offset-4 transition-all duration-200 hover:text-teal-500 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Bottom decorative text */}
        <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
          Protected by enterprise-grade security{" "}
          <span className="inline-block">🔒</span>
        </p>
      </div>
    </div>
  );
}
