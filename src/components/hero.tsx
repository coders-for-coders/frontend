"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Typed from 'typed.js';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const motto = useRef(null);
  useEffect(() => {
      const typed = new Typed(motto.current, {
        strings:["Unite", "Thrive", "Excel"],
        typeSpeed:50,
        loop:true
      });
      return () => {
        typed.destroy()
      }
  }, [])
  return (
    <div className="p-10 sm:p-10 m-5 rounded-3xl bg-slate-950 text-white flex items-center justify-center overflow-hidden shadow-2xl">
      <div className="w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col justify-center text-center md:text-left z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-8xl font-extrabold uppercase leading-tight tracking-tight"
            >
              Where <span className="text-purple-500">Coders <br/></span> <span ref={motto}/>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-400 text-balance"
            >
              Join a vibrant community of developers sharing knowledge, building
              projects, and growing together.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 sm:mt-8 flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button
                  onClick={() => {
                    window.location.href = "/join";
                  }}
                  className="w-full rounded-xl p-8 text-center border border-purple-500 bg-purple-500 text-white font-bold uppercase text-sm tracking-widest hover:bg-slate-950 transition-all duration-300 hover:shadow-[8px_8px_0px_rgba(168,85,247,10)] hover:translate-y-[-2px]"
                >
                  Get Started
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, x: 2, y: 2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button
                  onClick={() => {
                    window.open("https://discord.gg/ZVSmEAJ7fb", "_blank");
                  }}
                  className="w-full rounded-xl p-8 text-center border border-purple-500 text-purple-500 font-bold uppercase text-sm tracking-widest bg-slate-950 hover:bg-purple-500 shadow-[8px_8px_0px_rgba(168,85,247,10)] hover:shadow-[2px_2px_0px_rgba(168,85,247,10)] hover:text-white transition-all duration-300"
                >
                  Join Discord
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex items-center sm:m-10"
          >
            <motion.div 
              animate={{
                boxShadow: [
                  "10px 10px 0px rgba(168,85,247,0.6)",
                  "15px 15px 0px rgba(168,85,247,0.4)",
                  "10px 10px 0px rgba(168,85,247,0.6)",
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative z-10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 -right-1/2 -translate-x-1/2 grow text-center rounded-2xl text-nowrap border border-purple-500"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              >
                Community. Knowledge. Growth.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-2 text-sm sm:text-base font-light text-gray-300"
              >
                A platform built by developers, for developers.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}