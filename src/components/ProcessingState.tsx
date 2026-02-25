import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
    "Structuring raw data...",
    "Extracting document text...",
    "Aligning balance sheets...",
    "Generating neon charts...",
];

export const ProcessingState: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex((prev) => {
                if (prev === messages.length - 1) {
                    clearInterval(interval);
                    setTimeout(onComplete, 1500); // Complete after last message
                    return prev;
                }
                return prev + 1;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 h-full z-10">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Lava lamp / morphing liquid shape */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-accent-violet to-accent-cyan rounded-full mix-blend-screen blur-[20px]"
                    animate={{
                        borderRadius: [
                            "60% 40% 30% 70% / 60% 30% 70% 40%",
                            "30% 70% 70% 30% / 30% 30% 70% 70%",
                            "60% 40% 30% 70% / 60% 30% 70% 40%"
                        ],
                        scale: [1, 1.1, 0.9, 1],
                        rotate: [0, 90, 180, 360]
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
                <motion.div
                    className="absolute inset-4 bg-obsidian rounded-full z-10 flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"
                />

                {/* Glow core */}
                <motion.div
                    className="absolute z-20 w-16 h-16 bg-white/10 rounded-full blur-[10px]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            <div className="h-12 mt-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={msgIndex}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.5 }}
                        className="text-xl font-mono text-white tracking-widest uppercase"
                    >
                        {messages[msgIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
