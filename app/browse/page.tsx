import { getItems } from "@/actions/item";
import ItemCard from "@/components/ui/ItemCard";
import { Search } from "lucide-react";

const CATEGORIES = ["All", "Tools", "Electronics", "Kitchen", "Garden", "Sports", "Books", "Other"];

interface BrowseProps {
    searchParams: Promise<{ category?: string; search?: string; location?: string }>;
}

export default async function Browse({ searchParams }: BrowseProps) {
    const params = await searchParams;
    const activeCategory = params.category || "All";
    const searchQuery = params.search || "";
    const locationQuery = params.location || "";
    const items = await getItems(activeCategory, searchQuery, locationQuery);

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Browse Items
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Find what you need from neighbors in your community.
                </p>
            </div>

            {/* Search + Filter */}
            <div className="space-y-4">
                <form className="grid gap-4 sm:grid-cols-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            name="search"
                            defaultValue={searchQuery}
                            placeholder="Search items..."
                            className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="location"
                            defaultValue={locationQuery}
                            placeholder="Filter by location..."
                            className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 px-4 text-sm outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    {activeCategory !== "All" && (
                        <input type="hidden" name="category" value={activeCategory} />
                    )}
                    <button type="submit" className="hidden" />
                </form>

                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <a
                            key={cat}
                            href={`/browse?category=${cat}${searchQuery ? `&search=${searchQuery}` : ""}${locationQuery ? `&location=${locationQuery}` : ""}`}
                            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${activeCategory === cat
                                ? "bg-teal-600 text-white"
                                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                                }`}
                        >
                            {cat}
                        </a>
                    ))}
                </div>
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
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 py-16 dark:border-zinc-800">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <Search className="h-7 w-7 text-zinc-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                        No items matches your search
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                        Try adjusting your filters or checking back later.
                    </p>
                </div>
            )}
        </div>
    );
}
