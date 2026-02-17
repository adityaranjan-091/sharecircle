import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Package, User } from "lucide-react";

interface ItemCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    available: boolean;
    ownerName?: string;
}

export default function ItemCard({
    id,
    title,
    description,
    price,
    category,
    images,
    available,
    ownerName,
}: ItemCardProps) {
    return (
        <Link
            href={`/items/${id}`}
            className="group relative flex flex-col rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1.5 dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:shadow-zinc-900/50 dark:hover:border-zinc-600/60 overflow-hidden"
        >
            {/* Image / placeholder */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-850">
                {images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={images[0]}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2">
                        <div className="rounded-2xl bg-white/60 p-4 backdrop-blur-sm dark:bg-zinc-700/40">
                            <Package className="h-10 w-10 text-zinc-400 dark:text-zinc-500" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                            No image
                        </span>
                    </div>
                )}

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Availability badge */}
                <div className="absolute right-3 top-3">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${available
                                ? "bg-emerald-500/20 text-emerald-700 ring-1 ring-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400 dark:ring-emerald-400/30"
                                : "bg-red-500/20 text-red-700 ring-1 ring-red-500/30 dark:bg-red-500/20 dark:text-red-400 dark:ring-red-400/30"
                            }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${available
                                    ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                                    : "bg-red-500 shadow-sm shadow-red-500/50"
                                }`}
                        />
                        {available ? "Available" : "Taken"}
                    </span>
                </div>

                {/* Price tag */}
                <div className="absolute left-3 bottom-3">
                    <span className="inline-flex items-center rounded-lg bg-white/90 px-3 py-1.5 text-sm font-bold text-zinc-900 shadow-lg backdrop-blur-md dark:bg-zinc-900/90 dark:text-zinc-100">
                        {price === 0 ? (
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                Free
                            </span>
                        ) : (
                            <>
                                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                                    {price}
                                </span>
                                <span className="ml-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                    credits
                                </span>
                            </>
                        )}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 space-y-3">
                <div className="space-y-1.5">
                    <h3 className="font-semibold text-[15px] leading-snug text-zinc-900 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200 dark:text-zinc-100 dark:group-hover:text-orange-400">
                        {title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-zinc-500 line-clamp-2 dark:text-zinc-400">
                        {description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 mt-auto border-t border-zinc-100 dark:border-zinc-800">
                    <Badge variant="info">{category}</Badge>
                    {ownerName && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                            <User className="h-3 w-3" strokeWidth={2} />
                            <span className="max-w-[100px] truncate">{ownerName}</span>
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}