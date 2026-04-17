import React from "react";
import { motion } from "framer-motion";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const Card = ({ children, className = "", hoverEffect = true }: CardProps) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -5, scale: 1.02 } : {}}
            className={`
        relative overflow-hidden
        bg-gradient-to-br from-black/60 to-black/40 
        backdrop-blur-xl border border-purple-500/30 
        rounded-2xl p-6 shadow-2xl transition-all duration-300
        hover:border-purple-500/60 group
        ${className}
      `}
        >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Border glow on hover */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-xl font-bold text-white uppercase tracking-wider ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <p className={`text-gray-400 text-sm leading-relaxed ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`mt-6 pt-4 border-t border-purple-500/10 ${className}`}>{children}</div>
);
