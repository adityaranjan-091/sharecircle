import {
  Search,
  Sparkles,
  ArrowRight,
  Users,
  Leaf,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import AboutSection from "@/components/home/AboutSection";
import ImpactSection from "@/components/home/ImpactSection";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e8a8a] via-[#0a6b6b] to-[#3ea648] px-8 py-16 text-white shadow-2xl sm:px-12 sm:py-20 lg:py-24">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute h-96 w-96 -top-48 -left-48 rounded-full bg-[#3ea648] blur-3xl animate-pulse" />
          <div className="absolute h-96 w-96 -bottom-48 -right-48 rounded-full bg-[#f5921b] blur-3xl animate-pulse animation-delay-2000" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

        <div className="relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="h-4 w-4 text-[#f5921b] animate-pulse" />
              <span className="text-sm font-medium text-white/90">
                Community Sharing Platform
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block">Borrow from neighbors,</span>
              <span className="block mt-2 bg-gradient-to-r from-[#f5921b] via-yellow-300 to-[#3ea648] bg-clip-text text-transparent">
                not from stores.
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/90 leading-relaxed">
              ShareCircle connects you with neighbors who have the tools and
              equipment you need. Save money, reduce waste, and build meaningful
              community connections.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/browse"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#f5921b] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e67f0d] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Search className="h-5 w-5" />
                Start Borrowing
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto">
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg mb-2 group-hover:bg-white/20 transition-colors">
                  <Users className="h-6 w-6 text-[#f5921b]" />
                </div>
                <div className="text-2xl font-bold text-white">5K+</div>
                <div className="text-sm text-white/70">Active Users</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg mb-2 group-hover:bg-white/20 transition-colors">
                  <DollarSign className="h-6 w-6 text-[#f5921b]" />
                </div>
                <div className="text-2xl font-bold text-white">$50K</div>
                <div className="text-sm text-white/70">Saved Monthly</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg mb-2 group-hover:bg-white/20 transition-colors">
                  <Leaf className="h-6 w-6 text-[#3ea648]" />
                </div>
                <div className="text-2xl font-bold text-white">2 Tons</div>
                <div className="text-sm text-white/70">CO₂ Reduced</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 border-[#f5921b]/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-[#3ea648]/20 rounded-full animate-spin-slow animation-delay-1000" />
      </section>

      <AboutSection />
      <ImpactSection />
      <FAQSection />
    </div>
  );
}
