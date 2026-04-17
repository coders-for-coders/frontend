"use client";

import { motion } from "framer-motion";
import { useData } from "@/context/DataContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import { Calendar, User, Tag, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const { blogs } = useData();

  return (
    <div className="flex flex-col text-white min-h-screen">
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 border-b border-purple-500/20 pb-12 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">
              CFC <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent italic">Journal</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
              Insights, stories, and technical guides from the heart of our developer community.
            </p>
          </motion.div>

          {/* Featured Post / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full group hover:translate-y-[-8px] transition-all duration-500 flex flex-col p-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                       <Image 
                        src={blog.image} 
                        alt={blog.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {blog.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-purple-600/80 text-[10px] font-bold uppercase rounded border border-white/10">{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-gray-500 mb-3 tracking-widest">
                        <div className="flex items-center gap-1"><Calendar size={12}/> {blog.date}</div>
                        <div className="flex items-center gap-1"><User size={12}/> {blog.author}</div>
                      </div>
                      
                      <CardTitle className="text-xl mb-3 line-clamp-2 md:h-[3.5rem] group-hover:text-purple-400 transition-colors">
                        {blog.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm text-gray-400 mb-6 line-clamp-3 flex-grow">
                        {blog.excerpt}
                      </CardDescription>
                      
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-500"
                      >
                        Read Full Article <ChevronRight size={14} />
                      </motion.button>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
                <div className="col-span-full py-20 text-center">
                   <p className="text-gray-500 uppercase tracking-widest font-bold">No articles found yet.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
