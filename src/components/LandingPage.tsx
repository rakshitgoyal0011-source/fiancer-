import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Hexagon, Zap, Shield, BarChart3, ChevronRight, ChevronDown } from 'lucide-react';

export const LandingPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const featuresRef = useRef<HTMLDivElement>(null);
    const scrollToFeatures = () => featuresRef.current?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className="flex-1 flex flex-col items-center justify-start z-10 w-full relative h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
            {/* Stylish Logo */}
            <div className="absolute top-8 left-12 flex items-center space-x-4 z-50">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-obsidian to-glass border border-white/10 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                    <TrendingUp className="text-white w-6 h-6 z-10" strokeWidth={2.5} />
                    <div className="absolute inset-0 rounded-xl border border-accent-cyan/30 animate-pulse" />
                </div>
                <span className="font-mono font-bold text-3xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                    FINANCER
                </span>
            </div>

            {/* Hero Section */}
            <div className="w-full min-h-[90vh] flex flex-col items-center justify-center relative shrink-0 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center max-w-4xl mx-auto space-y-8"
                >
                    <h1 className="text-6xl md:text-8xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        Where Raw Data Meets <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet drop-shadow-[0_0_40px_rgba(0,240,255,0.4)]">
                            Liquid Intelligence.
                        </span>
                    </h1>

                    <p className="text-xl text-white/60 font-sans max-w-2xl mx-auto leading-relaxed">
                        Drop your raw spreadsheets into the void. Watch as Financer instantly synthesizes complex financial models into immersive, boardroom-ready visualizations. No coding. No broken formulas. Just pure, fluid analytics.
                    </p>

                    <motion.button
                        onClick={onLogin}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-12 px-12 py-5 rounded-full bg-white text-obsidian font-bold text-xl font-sans inline-flex items-center space-x-3 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-shadow duration-300"
                    >
                        <span>Model the Future</span>
                        <ChevronRight className="w-6 h-6" />
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 animate-bounce cursor-pointer flex flex-col items-center text-white/50 hover:text-white transition-colors"
                    onClick={scrollToFeatures}
                >
                    <span className="text-sm font-sans mb-2 font-medium tracking-widest uppercase">Discover</span>
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </div>

            {/* Feature List Cards */}
            <motion.div
                ref={featuresRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-7xl mx-auto px-8 shrink-0"
            >
                {[
                    { icon: Zap, title: "Seamless Ingestion", detail: "Drag, drop, and done. Transforms static, lifeless rows into a dynamic ecosystem in seconds." },
                    { icon: Hexagon, title: "Surgical Control", detail: "Isolate specific outputs from cash flow to multi-scenario models with unparalleled precision." },
                    { icon: BarChart3, title: "Immersive Analytics", detail: "Liquid-smooth, neon-lit charting for market trends and burn rates." },
                    { icon: Shield, title: "Pixel-Perfect Exports", detail: "High-fidelity PDFs or fully unlocked, auto-formulated Excel sheets ready for the boardroom." }
                ].map((feat, i) => (
                    <div key={i} className="glass-panel p-8 hover:bg-white/5 transition-colors group">
                        <feat.icon className="w-8 h-8 text-accent-cyan mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                        <h3 className="text-white font-sans font-bold text-xl mb-3">{feat.title}</h3>
                        <p className="text-white/50 text-base font-sans leading-relaxed">{feat.detail}</p>
                    </div>
                ))}
            </motion.div>

            {/* How It Works Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.0 }}
                className="mt-32 w-full max-w-7xl mx-auto px-8"
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-sans font-bold text-white mb-4">Intelligence at Warp Speed.</h2>
                    <p className="text-white/50 text-xl font-sans max-w-2xl mx-auto">From raw chaos to strategic clarity in three elegant steps.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

                    {[
                        { step: "01", title: "Drop & Detect", detail: "Upload your raw .xlsx, .csv, or .pdf files. Financer's ingestion engine automatically detects structures, tables, and temporal data.", align: "items-start" },
                        { step: "02", title: "Shape & Scope", detail: "Use the Configuration Grid to prune noise, define time horizons, and isolate the exact metrics that drive your narrative.", align: "items-center" },
                        { step: "03", title: "Visualize & Export", detail: "Instantly render boardroom-ready charts, perform sensitivity analysis, and export fully unlocked Excel models or styled PDFs.", align: "items-end" }
                    ].map((phase, i) => (
                        <div key={i} className={`flex flex-col ${phase.align} text-center relative z-10`}>
                            <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10 group-hover:border-accent-cyan transition-colors">
                                <span className="font-mono text-xl font-bold text-accent-cyan">{phase.step}</span>
                            </div>
                            <h3 className="text-2xl font-sans font-bold text-white mb-4">{phase.title}</h3>
                            <p className="text-white/60 font-sans leading-relaxed text-left md:text-center w-full max-w-sm">
                                {phase.detail}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Additional Content Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-32 max-w-5xl mx-auto px-8 text-center pb-20"
            >
                <div className="glass-panel p-12 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-violet/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none" />

                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">
                        From Static to Cinematic
                    </h2>
                    <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
                        Traditional financial modeling is broken. Financer transforms your tedious spreadsheet busywork into an interactive, visually stunning intelligence platform. Don't just present data—experience it.
                    </p>
                    <motion.button
                        onClick={onLogin}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full bg-accent-cyan/10 text-accent-cyan font-bold text-lg font-sans border border-accent-cyan/30 hover:border-accent-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300"
                    >
                        Try It For Free
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};
