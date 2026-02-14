"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "500+", label: "Items Shared" },
    { value: "₹25L+", label: "Money Saved" },
    { value: "1000kg", label: "CO2 Saved" },
    { value: "200+", label: "Active Neighbors" },
];

export default function ImpactSection() {
    return (
        <section id="impact" className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-800 -z-10" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold tracking-tight sm:text-4xl mb-6"
                >
                    Making a Real Impact
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-teal-100 text-lg mb-16"
                >
                    Together, we're building a more sustainable future by reducing consumption
                    and maximizing the value of what we already own.
                </motion.p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
                        >
                            <div className="text-4xl font-bold mb-2 text-white">
                                {stat.value}
                            </div>
                            <div className="text-teal-200 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
