"use client";

import { useState } from "react";
import { ExternalLink, Star, GitFork, User, Search, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Consumet API",
    description: "A comprehensive API for accessing anime, manga, and light novel data from various providers.",
    tags: ["TypeScript", "Node.js", "API"],
    stars: "2.4k",
    forks: "450",
    link: "https://github.com/consumet/consumet.ts",
    gradient: "from-purple-500/10 to-blue-500/10",
  },
  {
    title: "Shadow Anime",
    description: "A premium, ad-free anime streaming experience with a sleek Obsidian design.",
    tags: ["Next.js", "Tailwind", "HLS"],
    stars: "890",
    forks: "120",
    link: "#",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Manga Reader SDK",
    description: "High-performance reading engine supporting multiple image formats and smooth transitions.",
    tags: ["React", "Canvas", "Web Worker"],
    stars: "340",
    forks: "45",
    link: "#",
    gradient: "from-pink-500/10 to-purple-500/10",
  },
  {
    title: "DevUnite Dashboard",
    description: "Community management tool for tracking project contributions and member growth.",
    tags: ["PostgreSQL", "NextAuth", "Prisma"],
    stars: "150",
    forks: "20",
    link: "#",
    gradient: "from-green-500/10 to-emerald-500/10",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

export default function ProjectsPage() {
  const [search, setSearch] = useState("");

  const filteredProjects = PROJECTS.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col text-white">
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-center space-y-3 md:space-y-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
              Community <span className="text-purple-400">Projects</span>
            </h1>
            <p className="text-base sm:text-lg md:text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Explore innovative solutions built by our developer community.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: false, margin: "-100px" }}
            className="relative max-w-xl mx-auto group"
          >
            <div className="absolute inset-0 bg-purple-600/15 blur-xl group-focus-within:bg-purple-600/25 transition-all duration-400 rounded-lg" />
            <div className="relative flex items-center bg-black/50 backdrop-blur-lg border border-purple-500/30 group-focus-within:border-purple-400/60 rounded-lg px-5 py-3 focus-within:border-purple-400 transition-all duration-300">
              <Search className="w-5 h-5 text-purple-400 mr-3" />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-transparent border-none outline-none w-full text-white placeholder:text-gray-500 font-medium text-sm md:text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Project Grid with Stagger Animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: false, margin: "-100px" }}
                className="group relative"
              >
                {/* Card Content */}
                <div className="relative p-5 md:p-6 rounded-2xl bg-black/40 backdrop-blur-lg border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-500 shadow-lg h-full flex flex-col overflow-hidden">

                  {/* Purple glow effect at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="space-y-4 relative z-10 flex-grow flex flex-col">
                    {/* Title and Icon */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <motion.h3
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="text-lg md:text-xl font-bold uppercase tracking-tight group-hover:text-purple-200 transition-colors duration-300 leading-snug flex-grow"
                        >
                          {project.title}
                        </motion.h3>
                        <motion.div
                          whileHover={{ rotate: 45, scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-center p-2.5 rounded-lg bg-purple-600/15 border border-purple-500/30 group-hover:bg-purple-600/30 group-hover:border-purple-400 transition-all duration-300 flex-shrink-0"
                        >
                          <Code2 className="w-4 h-4 text-purple-400 group-hover:text-purple-200" />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                        className="flex flex-wrap gap-2"
                      >
                        {project.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.2 + i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 bg-purple-600/20 text-purple-300 rounded-md border border-purple-500/30 hover:bg-purple-600/40 hover:border-purple-400 transition-all duration-300"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      className="text-gray-400 leading-relaxed text-sm flex-grow group-hover:text-gray-300 transition-colors duration-300"
                    >
                      {project.description}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                      className="flex items-center gap-4 text-xs text-gray-500 font-medium py-3 border-t border-white/5"
                    >
                      <motion.div whileHover={{ scale: 1.1, x: 2 }} className="flex items-center gap-1.5 group/stat">
                        <Star className="w-4 h-4 text-yellow-400/70 group-hover/stat:text-yellow-300 transition-colors" />
                        <span className="group-hover/stat:text-gray-300 transition-colors">{project.stars}</span>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1, x: 2 }} className="flex items-center gap-1.5 group/stat">
                        <GitFork className="w-4 h-4 text-blue-400/70 group-hover/stat:text-blue-300 transition-colors" />
                        <span className="group-hover/stat:text-gray-300 transition-colors">{project.forks}</span>
                      </motion.div>
                    </motion.div>

                    {/* Action Button */}
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600/60 hover:bg-purple-600 text-white font-bold rounded-lg border border-purple-500/50 hover:border-purple-400 transition-all duration-300 uppercase tracking-wide text-xs shadow-md hover:shadow-lg mt-auto"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-black/20 rounded-3xl border border-dashed border-white/10"
            >
               <p className="text-gray-500 italic">No projects matched your search.</p>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
