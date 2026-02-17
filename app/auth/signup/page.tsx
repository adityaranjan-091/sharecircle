"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { loginUser, loginWithGoogle, registerUser } from "@/actions/auth";
import Button from "@/components/ui/Button";
import { User, Mail, Lock, ArrowRight, Sparkles, Shield } from "lucide-react";
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

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (!result.success) {
      setError(result.error || "Registration failed");
      setLoading(false);
      return;
    }

    const signInResult = await loginUser(formData);

    if (signInResult && !signInResult.success) {
      router.push("/auth/login");
    } else {
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
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] animate-pulse rounded-full bg-teal-400/8 blur-3xl dark:bg-teal-400/[0.03]" />
        <div className="absolute -right-40 top-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-cyan-400/8 blur-3xl [animation-delay:1s] dark:bg-cyan-400/[0.03]" />
        <div className="absolute -bottom-40 left-1/4 h-[450px] w-[450px] animate-pulse rounded-full bg-emerald-400/8 blur-3xl [animation-delay:2s] dark:bg-emerald-400/[0.03]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNhMWExYWEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
      </div>

      <div className="relative w-full max-w-[440px]">
        {/* Outer glow behind the card */}
        <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-500/10 via-transparent to-emerald-500/10 blur-2xl dark:from-teal-500/5 dark:to-emerald-500/5" />

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/90 shadow-2xl shadow-zinc-300/40 backdrop-blur-2xl dark:border-zinc-800/70 dark:bg-zinc-900/90 dark:shadow-zinc-950/60">
          <div className="px-8 py-10 sm:px-10 sm:py-12">
            {/* Header with real logo */}
            <div className="mb-10 text-center">
              <div className="group relative mx-auto flex h-20 w-20 items-center justify-center">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-35 group-hover:blur-2xl" />
                {/* Gradient border wrapper */}
                <div className="relative rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-[2.5px] shadow-xl shadow-teal-500/25 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-teal-500/30">
                  <div className="rounded-[13px] bg-white p-1.5 dark:bg-zinc-900">
                    <Image
                      src="/logo.png"
                      alt="ShareCircle Logo"
                      width={56}
                      height={56}
                      className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                Create your account
              </h1>
              <p className="mt-2.5 flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <Sparkles className="h-3.5 w-3.5 text-teal-500" />
                Join ShareCircle and start sharing with community
              </p>
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading}
              className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus:ring-offset-zinc-900"
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
              <span>
                {googleLoading ? "Signing up…" : "Sign up with Google"}
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200/80 dark:border-zinc-700/60" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white/90 px-4 text-xs font-medium uppercase tracking-widest text-zinc-400 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-500">
                  or
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200/80 bg-red-50/60 px-4 py-3.5 text-sm text-red-700 backdrop-blur-sm dark:border-red-800/50 dark:bg-red-900/15 dark:text-red-400">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                    <span className="text-xs font-bold">!</span>
                  </div>
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className={`text-sm font-semibold transition-colors duration-200 ${focusedField === "name"
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-zinc-700 dark:text-zinc-300"
                    }`}
                >
                  Full Name
                </label>
                <div className="group relative">
                  <div
                    className={`pointer-events-none absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-2xl transition-colors duration-200 ${focusedField === "name"
                      ? "text-teal-500"
                      : "text-zinc-400 dark:text-zinc-500"
                      }`}
                  >
                    <User className="h-[18px] w-[18px]" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/60 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition-all duration-200 placeholder:font-normal placeholder:text-zinc-400 hover:border-zinc-300 focus:border-teal-500 focus:bg-white focus:shadow-md focus:shadow-teal-500/8 focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-teal-500 dark:focus:bg-zinc-800/80 dark:focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className={`text-sm font-semibold transition-colors duration-200 ${focusedField === "email"
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-zinc-700 dark:text-zinc-300"
                    }`}
                >
                  Email address
                </label>
                <div className="group relative">
                  <div
                    className={`pointer-events-none absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-2xl transition-colors duration-200 ${focusedField === "email"
                      ? "text-teal-500"
                      : "text-zinc-400 dark:text-zinc-500"
                      }`}
                  >
                    <Mail className="h-[18px] w-[18px]" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/60 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition-all duration-200 placeholder:font-normal placeholder:text-zinc-400 hover:border-zinc-300 focus:border-teal-500 focus:bg-white focus:shadow-md focus:shadow-teal-500/8 focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-teal-500 dark:focus:bg-zinc-800/80 dark:focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className={`text-sm font-semibold transition-colors duration-200 ${focusedField === "password"
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-zinc-700 dark:text-zinc-300"
                    }`}
                >
                  Password
                </label>
                <div className="group relative">
                  <div
                    className={`pointer-events-none absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-2xl transition-colors duration-200 ${focusedField === "password"
                      ? "text-teal-500"
                      : "text-zinc-400 dark:text-zinc-500"
                      }`}
                  >
                    <Lock className="h-[18px] w-[18px]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    placeholder="At least 6 characters"
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/60 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition-all duration-200 placeholder:font-normal placeholder:text-zinc-400 hover:border-zinc-300 focus:border-teal-500 focus:bg-white focus:shadow-md focus:shadow-teal-500/8 focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-teal-500 dark:focus:bg-zinc-800/80 dark:focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className={`text-sm font-semibold transition-colors duration-200 ${focusedField === "confirmPassword"
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-zinc-700 dark:text-zinc-300"
                    }`}
                >
                  Confirm Password
                </label>
                <div className="group relative">
                  <div
                    className={`pointer-events-none absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-2xl transition-colors duration-200 ${focusedField === "confirmPassword"
                      ? "text-teal-500"
                      : "text-zinc-400 dark:text-zinc-500"
                      }`}
                  >
                    <Lock className="h-[18px] w-[18px]" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    placeholder="Repeat your password"
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/60 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition-all duration-200 placeholder:font-normal placeholder:text-zinc-400 hover:border-zinc-300 focus:border-teal-500 focus:bg-white focus:shadow-md focus:shadow-teal-500/8 focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-teal-500 dark:focus:bg-zinc-800/80 dark:focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <Button
                  type="submit"
                  loading={loading}
                  className="group w-full rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 py-3.5 text-sm font-bold shadow-lg shadow-teal-500/25 transition-all duration-300 hover:from-teal-600 hover:to-emerald-700 hover:shadow-xl hover:shadow-teal-500/30 active:scale-[0.98]"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </form>

            {/* Trust badge */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
              <Shield className="h-3 w-3" />
              <span>Protected by industry-standard encryption</span>
            </div>

            {/* Divider before footer */}
            <div className="my-6 border-t border-zinc-100 dark:border-zinc-800/60" />

            {/* Footer Link */}
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-bold text-teal-600 underline-offset-4 transition-all duration-200 hover:text-teal-500 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
              >
                Sign in
                <ArrowRight className="ml-0.5 inline h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
