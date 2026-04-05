"use client";

import { Users, Code, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <div className="flex flex-col text-white">

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-16">
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
              initial="initial"
              animate="animate"
              className="p-8 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border border-purple-500/40 shadow-lg hover:shadow-xl hover:border-purple-500/60 transition-all duration-300 group"
              style={{
                boxShadow: "0 0 0px rgba(167, 139, 250, 0)"
              }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(167, 139, 250, 0)",
                    "0 0 20px rgba(167, 139, 250, 0.5)",
                    "0 0 0px rgba(167, 139, 250, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors"
              >
                <Users className="text-purple-400 w-7 h-7" />
              </motion.div>
              <h3 className="text-xl font-bold uppercase mb-3 tracking-wider">Community First</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We believe in the power of people. Our community is built on mutual respect, helping hands, and shared success.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              initial="initial"
              animate="animate"
              className="p-8 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border border-purple-500/40 shadow-lg hover:shadow-xl hover:border-purple-500/60 transition-all duration-300 group"
              style={{
                boxShadow: "0 0 0px rgba(167, 139, 250, 0)"
              }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(167, 139, 250, 0)",
                    "0 0 20px rgba(167, 139, 250, 0.5)",
                    "0 0 0px rgba(167, 139, 250, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors"
              >
                <Code className="text-purple-400 w-7 h-7" />
              </motion.div>
              <h3 className="text-xl font-bold uppercase mb-3 tracking-wider">Open Source Spirit</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our mission is to bridge the gap between learning and building. We&apos;ve created a space where your contributions matter, regardless of your experience level.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              initial="initial"
              animate="animate"
              className="p-8 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border border-purple-500/40 shadow-lg hover:shadow-xl hover:border-purple-500/60 transition-all duration-300 group"
              style={{
                boxShadow: "0 0 0px rgba(167, 139, 250, 0)"
              }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(167, 139, 250, 0)",
                    "0 0 20px rgba(167, 139, 250, 0.5)",
                    "0 0 0px rgba(167, 139, 250, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors"
              >
                <TrendingUp className="text-purple-400 w-7 h-7" />
              </motion.div>
              <h3 className="text-xl font-bold uppercase mb-3 tracking-wider">Continuous Growth</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The journey never ends. We provide resources, tutorials, and mentorship to ensure our members are always leveling up.
              </p>
            </motion.div>
          </motion.section>

        </div>
      </main>
    </div>
  );
}
