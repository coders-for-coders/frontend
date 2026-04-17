"use client";

import { Users, Code, TrendingUp, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import { useData } from "@/context/DataContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    }
  }
};

export default function AboutPage() {
  const { members } = useData();

  return (
    <div className="flex flex-col text-white">

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-center space-y-4 md:space-y-5"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Our <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text">Mission</span>
            </h1>
            <p className="text-sm sm:text-base md:text-base text-gray-400 font-light max-w-2xl mx-auto leading-relaxed italic">
              &quot;To unite developers through collaboration, shared knowledge, and the relentless pursuit of building great things together.&quot;
            </p>
          </motion.section>

          {/* Core Values */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border border-purple-500/40 shadow-lg hover:shadow-xl hover:border-purple-500/60 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <span className="text-purple-400 w-7 h-7 flex items-center justify-center"><Users /></span>
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 tracking-wider">Community First</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We believe in the power of people. Our community is built on mutual respect, helping hands, and shared success.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border border-purple-500/40 shadow-lg hover:shadow-xl hover:border-purple-500/60 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <span className="text-purple-400 w-7 h-7 flex items-center justify-center"><Code /></span>
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 tracking-wider">Open Source Spirit</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our mission is to bridge the gap between learning and building. We&apos;ve created a space where your contributions matter, regardless of your experience level.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border border-purple-500/40 shadow-lg hover:shadow-xl hover:border-purple-500/60 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <span className="text-purple-400 w-7 h-7 flex items-center justify-center"><TrendingUp /></span>
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 tracking-wider">Continuous Growth</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The journey never ends. We provide resources, tutorials, and mentorship to ensure our members are always leveling up.
              </p>
            </motion.div>
          </motion.section>

          {/* Members Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, margin: "-100px" }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold uppercase tracking-tight">
                The <span className="text-purple-500">Minds</span> Behind CFC
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-sm">
                Meet the visionaries and contributors behind the Coders for Coders community.
              </p>
            </div>

            {(() => {
              const count = members.length;
              const isCompact = count > 2;
              const gridClass =
                count === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
                count === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' :
                count === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto' :
                count === 4 ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto' :
                count <= 6 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

              return (
                <div className={`grid ${gridClass} gap-6 justify-items-center`}>
                  {members.map((member) => (
                    <Card key={member.id} className={`w-full flex flex-col h-full bg-slate-900/50 ${isCompact ? '!p-4' : ''}`}>
                      <CardHeader className={`flex flex-col items-center ${isCompact ? 'gap-2' : 'gap-4'}`}>
                        <div className={`relative rounded-full p-0.5 bg-gradient-to-tr ${isCompact ? 'w-20 h-20 mb-1' : 'w-28 h-28 mb-2'} ${
                          member.roleType === 'Founder' ? 'from-purple-500 to-blue-500' :
                          member.roleType === 'OG Member' ? 'from-blue-500 to-emerald-500' :
                          'from-gray-500 to-slate-500'
                        }`}>
                          <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-black/50 bg-black">
                            <Image
                              src={member.avatar || "https://github.com/shadcn.png"}
                              alt={member.name}
                              width={isCompact ? 80 : 112}
                              height={isCompact ? 80 : 112}
                              className="object-cover h-full w-full"
                              unoptimized
                            />
                          </div>
                          <div className={`absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter border border-white/20 shadow-lg ${isCompact ? 'text-[8px]' : 'text-[9px]'} ${
                            member.roleType === 'Founder' ? 'bg-purple-600' :
                            member.roleType === 'OG Member' ? 'bg-blue-600' :
                            'bg-slate-700'
                          }`}>
                            {member.roleType}
                          </div>
                        </div>
                        <div className="text-center">
                          <CardTitle className={isCompact ? 'text-base mb-0.5' : 'text-xl mb-1'}>{member.name}</CardTitle>
                          <p className={`text-purple-400 font-semibold uppercase tracking-widest ${isCompact ? 'text-[9px]' : 'text-[10px]'}`}>{member.role}</p>
                        </div>
                      </CardHeader>
                      <CardContent className={`text-center flex-grow flex flex-col justify-between ${isCompact ? 'space-y-2 pt-1' : 'space-y-4 pt-2'}`}>
                        <CardDescription className={`italic text-gray-400 ${isCompact ? 'text-xs line-clamp-2' : 'text-sm'}`}>
                          &quot;{member.bio}&quot;
                        </CardDescription>
                        <div className={`flex justify-center gap-4 text-gray-500 ${isCompact ? 'pt-2' : 'pt-4'}`}>
                          {member.github && <motion.a whileHover={{ y: -3, color: "#a855f7" }} href={member.github} aria-label="GitHub"><Github size={isCompact ? 14 : 16} /></motion.a>}
                          {member.linkedin && <motion.a whileHover={{ y: -3, color: "#a855f7" }} href={member.linkedin} aria-label="LinkedIn"><Linkedin size={isCompact ? 14 : 16} /></motion.a>}
                          {member.twitter && <motion.a whileHover={{ y: -3, color: "#a855f7" }} href={member.twitter} aria-label="Twitter"><Twitter size={isCompact ? 14 : 16} /></motion.a>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })()}
          </motion.section>

        </div>
      </main>
    </div>
  );
}
