"use client";

import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="flex flex-col text-white min-h-screen">
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-6 border-b border-purple-500/20 pb-12">
              <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Journal
                </span>
              </h1>
              <p className="text-xl text-gray-300 font-light max-w-2xl leading-relaxed">
                Our blog platform is currently under development. Stay tuned for insightful articles, case studies, and stories from our developer community.
              </p>
            </div>

            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="py-16"
            >
              <div className="space-y-4">
                <p className="text-gray-400 text-lg">
                  Check back soon for compelling content written by and for developers.
                </p>
                <motion.a
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://discord.gg/ZVSmEAJ7fb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold uppercase tracking-wide rounded-lg border border-purple-500/50 transition-all duration-300"
                >
                  Join Discord for Updates
                  <span className="text-lg">→</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
