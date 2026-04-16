"use client";

import { useState } from "react";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Github, MessageCircle, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    title: "Join the Discord",
    description: "Our community lives on Discord. It&apos;s where we collaborate, share resources, and provide support.",
    icon: <MessageCircle className="w-12 h-12 text-purple-500" />,
    actionText: "Join Server",
    actionLink: "https://discord.gg/ZVSmEAJ7fb",
    tip: "Tip: Once you join, head to the #introductions channel!"
  },
  {
    title: "GitHub Organization",
    description: "Follow our organization on GitHub and explore our open-source projects.",
    icon: <Github className="w-12 h-12 text-blue-500" />,
    actionText: "Follow Organization",
    actionLink: "https://github.com/coders-for-coders",
    tip: "Tip: Forking a project is the best way to start contributing."
  },
  {
    title: "Introduce Yourself",
    description: "Share your stack, your goals, and what you&apos;re working on with the community.",
    icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
    actionText: "Go to #introductions",
    actionLink: "https://discord.gg/ZVSmEAJ7fb",
    tip: "Template: Hi, I&apos;m [Name], I work with [Stack] and I&apos;m here to [Goal]!"
  }
];

export default function JoinFlowPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="flex flex-col bg-slate-950 min-h-screen text-white">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-2xl w-full space-y-12">
          
          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="flex justify-between items-end text-xs font-black uppercase tracking-[0.3em] text-gray-500">
               <span>Step {currentStep + 1} of {STEPS.length}</span>
               <span className="text-purple-500">{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div
                 className="h-full bg-purple-500 transition-all duration-700 ease-out"
                 style={{ width: `${progress}%` }}
               />
            </div>
          </div>

          {/* Step Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-purple-500/10 blur-[100px] group-hover:bg-purple-500/20 transition-all duration-700 -z-10" />
            
            <div className="p-10 md:p-14 rounded-[3rem] bg-black/40 backdrop-blur-2xl border border-purple-500/10 shadow-2xl space-y-8 min-h-[500px] flex flex-col justify-center">
               <div className="flex justify-center">
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {STEPS[currentStep].icon}
                  </div>
               </div>
               
               <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                    {STEPS[currentStep].title}
                  </h2>
                  <p className="text-gray-400 text-base leading-relaxed font-light">
                    {STEPS[currentStep].description}
                  </p>
               </div>

               <div className="pt-4 flex flex-col gap-4">
                  <a 
                    href={STEPS[currentStep].actionLink} 
                    target="_blank"
                    className="w-full py-5 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 transform hover:-translate-y-1 transition-all uppercase tracking-widest text-sm text-center"
                  >
                    {STEPS[currentStep].actionText}
                  </a>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest text-center">
                    {STEPS[currentStep].tip}
                  </p>
               </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between gap-6">
            <Button 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-8 py-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/5 disabled:opacity-20 transition-all uppercase tracking-widest text-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            
            <Button 
              onClick={nextStep}
              disabled={currentStep === STEPS.length - 1}
              className="px-8 py-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/5 disabled:opacity-20 transition-all uppercase tracking-widest text-xs flex items-center gap-2"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
