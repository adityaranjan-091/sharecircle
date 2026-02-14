import { getItems } from "@/actions/item";
import ItemCard from "@/components/ui/ItemCard";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Wrench,
  Monitor,
  UtensilsCrossed,
  Flower2,
  Dumbbell,
  BookOpen,
  LayoutGrid,
  Package,
} from "lucide-react";

const CATEGORIES = [
  { name: "All", icon: LayoutGrid },
  { name: "Tools", icon: Wrench },
  { name: "Electronics", icon: Monitor },
  { name: "Kitchen", icon: UtensilsCrossed },
  { name: "Garden", icon: Flower2 },
  { name: "Sports", icon: Dumbbell },
  { name: "Books", icon: BookOpen },
  { name: "Other", icon: Package },
];

interface BrowseProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    location?: string;
  }>;
}

export default async function Browse({ searchParams }: BrowseProps) {
  const params = await searchParams;
  const activeCategory = params.category || "All";
  const searchQuery = params.search || "";
  const locationQuery = params.location || "";
  const items = await getItems(activeCategory, searchQuery, locationQuery);

  return (
    <div className="relative min-h-screen">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal-400/5 blur-3xl dark:bg-teal-400/[0.02]" />
        <div className="absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-400/5 blur-3xl dark:bg-emerald-400/[0.02]" />
      </div>

      <div className="relative container mx-auto space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/20">
              <Search className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Browse Items
            </h1>
          </div>
          <p className="ml-[52px] text-zinc-500 dark:text-zinc-400">
            Find what you need from neighbors in your community.
          </p>
        </div>

        {/* Search + Filter Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-lg shadow-zinc-200/30 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:shadow-zinc-900/30 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <SlidersHorizontal className="h-4 w-4 text-teal-500" />
            Search & Filter
          </div>

          <form className="grid gap-4 sm:grid-cols-2">
            <div className="group relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 transition-colors duration-200 group-focus-within:text-teal-500" />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search items..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-3 pl-11 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-teal-500 focus:bg-white focus:shadow-sm focus:shadow-teal-500/10 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-teal-500 dark:focus:bg-zinc-800"
              />
            </div>
            <div className="group relative">
              <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 transition-colors duration-200 group-focus-within:text-teal-500" />
              <input
                type="text"
                name="location"
                defaultValue={locationQuery}
                placeholder="Filter by location..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-3 pl-11 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-teal-500 focus:bg-white focus:shadow-sm focus:shadow-teal-500/10 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-teal-500 dark:focus:bg-zinc-800"
              />
            </div>
            {activeCategory !== "All" && (
              <input type="hidden" name="category" value={activeCategory} />
            )}
            <button type="submit" className="hidden" />
          </form>

          {/* Category Pills */}
          <div className="mt-5 border-t border-zinc-100 pt-5 dark:border-zinc-800">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.name;
                return (
                  <a
                    key={cat.name}
                    href={`/browse?category=${cat.name}${searchQuery ? `&search=${searchQuery}` : ""}${locationQuery ? `&location=${locationQuery}` : ""}`}
                    className={`group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/25"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-teal-700 dark:hover:bg-teal-900/20 dark:hover:text-teal-300"
                    }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? "text-white/90" : ""
                      }`}
                    />
                    {cat.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {items.length > 0 ? (
              <>
                Showing{" "}
                <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                  {items.length}
                </span>{" "}
                {items.length === 1 ? "item" : "items"}
                {activeCategory !== "All" && (
                  <>
                    {" "}
                    in{" "}
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      {activeCategory}
                    </span>
                  </>
                )}
              </>
            ) : (
              "No results found"
            )}
          </p>
        </div>

        {/* Items Grid */}
        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {items.map((item: any) => (
              <ItemCard
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item.price}
                category={item.category}
                images={item.images}
                available={item.available}
                ownerName={item.owner?.name}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-white/50 py-20 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-teal-400/10 blur-xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900">
                <Search className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
              </div>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              No items match your search
            </h3>
            <p className="mt-2 max-w-sm text-center text-sm text-zinc-500 dark:text-zinc-400">
              Try adjusting your filters, searching with different keywords, or
              checking back later for new listings.
            </p>
            <a
              href="/browse"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-teal-500/25 transition-all duration-200 hover:from-teal-600 hover:to-emerald-700 hover:shadow-xl hover:shadow-teal-500/30 active:scale-[0.98]"
            >
              <LayoutGrid className="h-4 w-4" />
              View All Items
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
