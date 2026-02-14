"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, Heart } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Community Driven",
        description: "Connect with neighbors and build a stronger, more resilient local community.",
    },
    {
        icon: ShieldCheck,
        title: "Secure & Trusted",
        description: "Verified users and secure transactions ensure peace of mind for everyone.",
    },
    {
        icon: Heart,
        title: "Eco-Friendly",
        description: "Reduce waste by sharing resources instead of buying new items you rarely use.",
    },
];

export default function AboutSection() {
    return (
        <section id="about" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl"
                    >
                        Why ShareCircle?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 text-lg text-zinc-600 dark:text-zinc-400"
                    >
                        We're on a mission to bring communities together through the power of sharing.
                        Discover how easy it is to borrow, lend, and connect.
                    </motion.p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
