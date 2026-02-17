// app/page.tsx
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Leaf,
  Heart,
  ArrowRight,
  CheckCircle,
  Shield,
  MessageCircle,
  Clock,
  Headphones,
  Scale,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import FAQ from "@/components/ui/FAQ";

/* ─────────────────────── DATA ─────────────────────── */

const STATS = [
  { value: "2.5K+", label: "Active Members" },
  { value: "5.8K+", label: "Items Shared" },
  { value: "$120K", label: "Saved Together" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Save Money",
    description:
      "Borrow instead of buy. Access tools and equipment at a fraction of the cost.",
    accent: {
      bg: "bg-teal-100 dark:bg-teal-950/60",
      text: "text-teal-600 dark:text-teal-400",
      border: "border-teal-200/60 dark:border-teal-800/40",
      glow: "group-hover:shadow-teal-200/40 dark:group-hover:shadow-teal-900/30",
    },
  },
  {
    icon: Leaf,
    title: "Reduce Waste",
    description:
      "Keep items in use longer. Less consumption means less waste in landfills.",
    accent: {
      bg: "bg-emerald-100 dark:bg-emerald-950/60",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200/60 dark:border-emerald-800/40",
      glow: "group-hover:shadow-emerald-200/40 dark:group-hover:shadow-emerald-900/30",
    },
  },
  {
    icon: Heart,
    title: "Build Community",
    description:
      "Connect with neighbors, create friendships, and strengthen your local community.",
    accent: {
      bg: "bg-rose-100 dark:bg-rose-950/60",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-200/60 dark:border-rose-800/40",
      glow: "group-hover:shadow-rose-200/40 dark:group-hover:shadow-rose-900/30",
    },
  },
];

const STEPS = [
  {
    step: 1,
    title: "Create Your Profile",
    description:
      "Sign up and tell us about yourself. Build trust with a verified profile.",
  },
  {
    step: 2,
    title: "Browse or List",
    description:
      "Find items to borrow or list your own. Set your lending terms and prices.",
  },
  {
    step: 3,
    title: "Connect & Share",
    description:
      "Message neighbors, arrange pickups, and enjoy sharing resources.",
  },
];

const BENEFITS = [
  { icon: Shield, text: "Verified member profiles and reviews" },
  { icon: MessageCircle, text: "Secure messaging and payment options" },
  { icon: CheckCircle, text: "Item protection and insurance" },
  { icon: Headphones, text: "24/7 community support" },
  { icon: Scale, text: "Easy dispute resolution" },
  { icon: Calendar, text: "Flexible booking and cancellation" },
];

const FAQ_ITEMS = [
  {
    question: "How do I get started with ShareCircle?",
    answer:
      "Simply create an account, complete your profile, and you're ready to browse items or list your own. It takes less than 5 minutes to join our community!",
  },
  {
    question: "Is it safe to share items with strangers?",
    answer:
      "Yes! ShareCircle has built-in safety features including verified member profiles, community reviews, messaging, and optional insurance coverage for high-value items. We also have a dispute resolution system to ensure both parties are protected.",
  },
  {
    question: "How much does it cost to use ShareCircle?",
    answer:
      "Creating an account and browsing items is completely free. Lenders set their own prices, and ShareCircle charges a small service fee only when a booking is completed. We keep fees transparent with no hidden charges.",
  },
  {
    question: "What happens if a borrowed item gets damaged?",
    answer:
      "ShareCircle offers optional item protection insurance for valuable items. If an item is damaged, you can file a claim through our platform. The insurance covers accidental damage up to the item's declared value.",
  },
  {
    question: "How do I cancel a booking?",
    answer:
      "You can cancel a booking anytime before the rental period starts with a full refund. Cancellations made within 24 hours of the start date may be subject to a cancellation fee.",
  },
  {
    question: "Can I list items that I don't own?",
    answer:
      "No, you can only list items that you own. This helps maintain trust and safety in our community. All items should be in good condition and accurately described.",
  },
  {
    question: "How do payments work?",
    answer:
      "ShareCircle uses secure payment processing. Money is held in escrow until both the borrower receives the item and confirms satisfaction. Lenders receive payments after successful bookings.",
  },
  {
    question: "Can I earn money by lending items?",
    answer:
      "Absolutely! Many members use ShareCircle to earn extra income by renting out items they don't use frequently. You set your own rental prices and availability.",
  },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function Home() {
  return (
    <div className="space-y-28 pb-24">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 px-6 py-20 text-white sm:px-12 sm:py-28 lg:py-36">
        {/* decorative dots */}
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        {/* glow blobs */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-teal-400/10 blur-3xl [animation-delay:2s]" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-64 w-64 animate-pulse rounded-full bg-emerald-300/5 blur-3xl [animation-delay:4s]" />

        <div className="relative mx-auto max-w-4xl space-y-12">
          {/* badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-medium text-teal-50 shadow-lg shadow-black/5 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-teal-200" />
            Welcome to ShareCircle
          </span>

          {/* headline */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
              Borrow from neighbors,
              <br />
              <span className="bg-gradient-to-r from-teal-200 via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                not from stores.
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-teal-50/85 sm:text-xl">
              ShareCircle connects you with neighbors who have the tools and
              equipment you need. Save money, reduce waste, and build a stronger
              community — all with a few clicks.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 font-semibold text-teal-700 shadow-xl shadow-teal-900/25 transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-teal-900/30 active:scale-95"
            >
              <Sparkles className="h-5 w-5" />
              Start Browsing
            </Link>
            <Link
              href="/items/new"
              className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-white/30 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/15"
            >
              <Zap className="h-5 w-5" />
              List Your Item
            </Link>
          </div>

          {/* stats */}
          <div
            id="impact"
            className="grid scroll-mt-28 grid-cols-3 gap-6 border-t border-white/15 pt-12 sm:gap-12"
          >
            {STATS.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {s.value}
                </p>
                <p className="text-sm font-medium text-teal-200/80">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section id="about" className="scroll-mt-28 space-y-16">
        <SectionHeading
          title="Why ShareCircle?"
          subtitle="We are making community sharing easier, safer, and more rewarding than ever."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`group relative rounded-2xl border border-zinc-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${f.accent.glow} dark:border-zinc-800 dark:bg-zinc-950`}
            >
              {/* subtle gradient background on hover */}
              <div
                className={`absolute inset-0 rounded-2xl ${f.accent.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.04]`}
              />
              <div className="relative">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${f.accent.bg} ring-1 ${f.accent.border} transition-transform duration-300 group-hover:scale-110`}
                >
                  <f.icon className={`h-7 w-7 ${f.accent.text}`} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-3 leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── How It Works ───── */}
      <section className="space-y-16">
        <SectionHeading
          title="How It Works"
          subtitle="Getting started is simple. Just follow these three steps."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative">
              <div className="group flex h-full flex-col rounded-2xl border border-teal-200/40 bg-gradient-to-br from-teal-50/80 to-emerald-50/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-100/40 dark:border-teal-800/30 dark:from-teal-950/40 dark:to-emerald-950/40 dark:hover:shadow-teal-900/20">
                {/* step number */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 text-lg font-bold text-white shadow-lg shadow-teal-600/25 transition-transform duration-300 group-hover:scale-110">
                  {s.step}
                </div>
                {/* dashed connector line */}
                <div className="mt-6 mb-1 h-px w-12 border-t-2 border-dashed border-teal-300/60 dark:border-teal-700/60" />
                <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {s.description}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200/60 dark:bg-zinc-900 dark:ring-zinc-700">
                    <ArrowRight className="h-4 w-4 animate-pulse text-teal-500" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ───── Benefits / Trust ───── */}
      <section className="space-y-10 overflow-hidden rounded-3xl border border-zinc-200/60 bg-gradient-to-br from-zinc-50 via-white to-zinc-100/60 p-8 shadow-sm dark:border-zinc-800/60 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/60 sm:p-14">
        <SectionHeading
          title="Trusted by Our Community"
          subtitle="Safety and trust are at the core of everything we do."
          align="left"
        />

        <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div
              key={b.text}
              className="group flex items-start gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-teal-50/50 dark:hover:bg-teal-950/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100/80 ring-1 ring-teal-200/50 transition-transform duration-200 group-hover:scale-110 dark:bg-teal-950/60 dark:ring-teal-800/40">
                <b.icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <p className="pt-2 text-[17px] leading-snug text-zinc-700 dark:text-zinc-300">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section id="faqs" className="scroll-mt-28 space-y-16">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about ShareCircle and how it works."
        />

        <div className="mx-auto max-w-3xl">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 px-6 py-16 text-center text-white sm:px-12 sm:py-24">
        {/* glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-300/5 blur-3xl" />

        <div className="relative mx-auto max-w-2xl space-y-10">
          {/* decorative icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-emerald-200" />
          </div>

          <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
            Ready to Join ShareCircle?
          </h2>
          <p className="mx-auto max-w-lg text-lg leading-relaxed text-emerald-50/85">
            Start sharing today and be part of a community that values
            sustainability, savings, and solidarity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-9 py-4 font-semibold text-emerald-700 shadow-xl shadow-emerald-900/25 transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-emerald-900/30 active:scale-95"
            >
              Explore Items Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/items/new"
              className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-white/30 bg-white/5 px-9 py-4 font-semibold backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/15"
            >
              <Sparkles className="h-5 w-5" />
              List Your First Item
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────── INLINE COMPONENTS ─────────────── */

function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`space-y-4 ${alignment}`}>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}