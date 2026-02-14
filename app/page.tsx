import Link from "next/link";
import {
  Sparkles,
  Zap,
  Users,
  Leaf,
  Heart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import FAQ from "@/components/ui/FAQ";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 px-6 py-16 text-white sm:px-12 sm:py-24 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        {/* Floating Shapes */}
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

        {/* Content */}
        <div className="relative space-y-8 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm w-fit">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium text-teal-100">
              Welcome to ShareCircle
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Borrow from neighbors,
              <br />
              <span className="bg-gradient-to-r from-teal-100 to-emerald-100 bg-clip-text text-transparent">
                not from stores.
              </span>
            </h1>
            <p className="text-lg text-teal-100 sm:text-xl max-w-2xl">
              ShareCircle connects you with neighbors who have the tools and
              equipment you need. Save money, reduce waste, and build a stronger
              community—all with a few clicks.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-teal-700 transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-5 w-5" />
              Start Browsing
            </Link>
            <Link
              href="/items/new"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Zap className="h-5 w-5" />
              List Your Item
            </Link>
          </div>

          {/* Stats */}
          <div
            id="impact"
            className="grid grid-cols-3 gap-6 pt-8 sm:gap-12 scroll-mt-28"
          >
            <div className="space-y-2">
              <p className="text-2xl font-bold sm:text-3xl">2.5K+</p>
              <p className="text-sm text-teal-100">Active Members</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold sm:text-3xl">5.8K+</p>
              <p className="text-sm text-teal-100">Items Shared</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold sm:text-3xl">$120K</p>
              <p className="text-sm text-teal-100">Saved Together</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="space-y-12 scroll-mt-28">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Why ShareCircle?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            We are making community sharing easier, safer, and more rewarding
            than ever.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-950">
              <Zap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
              Save Money
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Borrow instead of buy. Access tools and equipment at a fraction of
              the cost.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950">
              <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
              Reduce Waste
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Keep items in use longer. Less consumption means less waste in
              landfills.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-950">
              <Heart className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
              Build Community
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Connect with neighbors, create friendships, and strengthen your
              local community.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Getting started is simple. Just follow these three steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
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
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 p-8 dark:from-teal-950 dark:to-emerald-950">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
              {item.step < 3 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block">
                  <ArrowRight className="h-6 w-6 text-teal-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="space-y-8 rounded-2xl bg-zinc-50 p-8 sm:p-12 dark:bg-zinc-900">
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
          Trusted by Our Community
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            "✓ Verified member profiles and reviews",
            "✓ Secure messaging and payment options",
            "✓ Item protection and insurance",
            "✓ 24/7 community support",
            "✓ Easy dispute resolution",
            "✓ Flexible booking and cancellation",
          ].map((benefit) => (
            <div key={benefit} className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="space-y-12 scroll-mt-28">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Everything you need to know about ShareCircle and how it works.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQ
            items={[
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
                  "ShareCircle offers optional item protection insurance for valuable items. If an item is damaged, you can file a claim through our platform. The insurance covers accidental damage up to the item's declared value. Both parties can also agree on their own damage terms when booking.",
              },
              {
                question: "How do I cancel a booking?",
                answer:
                  "You can cancel a booking anytime before the rental period starts with a full refund. Cancellations made within 24 hours of the start date may be subject to a cancellation fee. Once the rental has started, cancellations are handled based on the lender's cancellation policy.",
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
                  "Absolutely! Many members use ShareCircle to earn extra income by renting out items they don't use frequently. You set your own rental prices and availability. After ShareCircle's small service fee, all earnings go directly to you.",
              },
            ]}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 px-6 py-12 text-white text-center sm:px-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Join ShareCircle?
        </h2>
        <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
          Start sharing today and be part of a community that values
          sustainability, savings, and solidarity.
        </p>
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-emerald-700 transition-transform hover:scale-105 active:scale-95"
        >
          Explore Items Now
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}
