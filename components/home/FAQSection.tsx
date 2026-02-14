"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Is it safe to lend my items?",
        answer: "Yes! We verify all users and provide an insurance guarantee for all items listed on the platform up to ₹10,000.",
    },
    {
        question: "How do payments work?",
        answer: "Payments are processed securely through our platform. Borrowers pay when booking, and lenders receive payment after the item is returned.",
    },
    {
        question: "What if an item gets damaged?",
        answer: "In the rare event of damage, our support team steps in. Borrowers are responsible for damages, and our guarantee protects lenders.",
    },
    {
        question: "Is there a fee to use ShareCircle?",
        answer: "Listing items is free. We charge a small service fee on completed transactions to maintain the platform and insurance coverage.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faqs" className="py-20 bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                        Everything you need to know about sharing on ShareCircle.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                            >
                                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <Minus className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                ) : (
                                    <Plus className="h-5 w-5 text-zinc-400" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 pt-0 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
