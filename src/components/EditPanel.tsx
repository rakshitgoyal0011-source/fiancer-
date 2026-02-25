import React from 'react';
import { motion } from 'framer-motion';

export interface EditPanelProps {
    growth: number; setGrowth: (v: number) => void;
    cogs: number; setCogs: (v: number) => void;
    opex: number; setOpex: (v: number) => void;
}

export const EditPanel: React.FC<EditPanelProps> = ({
    growth, setGrowth,
    cogs, setCogs,
    opex, setOpex
}) => {

    return (
        <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[380px] h-[calc(100vh-100px)] glass-panel fixed right-6 top-24 z-30 p-6 flex flex-col overflow-y-auto overflow-x-hidden border-r-0 rounded-r-none"
        >
            <div className="mb-8">
                <h2 className="text-2xl font-bold font-sans text-white mb-2">Assumptions</h2>
                <p className="text-white/50 text-sm font-sans">Adjust key drivers to immediately see the impact on your model.</p>
            </div>

            <div className="space-y-8">
                {/* Slider 1 */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-white/80 font-sans text-sm font-semibold tracking-wide">Expected Growth Rate</label>
                        <span className="text-accent-cyan font-mono font-bold">{growth.toFixed(1)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="50" step="0.5" value={growth} onChange={(e) => setGrowth(parseFloat(e.target.value))}
                        className="w-full appearance-none bg-glass-border h-2 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-cyan [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(0,240,255,0.8)] [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                </div>

                {/* Slider 2 */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-white/80 font-sans text-sm font-semibold tracking-wide">COGS Margin %</label>
                        <span className="text-accent-violet font-mono font-bold">{cogs.toFixed(1)}%</span>
                    </div>
                    <input
                        type="range"
                        min="10" max="60" value={cogs} step="0.5" onChange={(e) => setCogs(parseFloat(e.target.value))}
                        className="w-full appearance-none bg-glass-border h-2 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-violet [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(138,43,226,0.8)] [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                </div>

                {/* Slider 3 */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-white/80 font-sans text-sm font-semibold tracking-wide">Operating Expenses Exp.</label>
                        <span className="text-neon-coral font-mono font-bold">{opex.toFixed(1)}%</span>
                    </div>
                    <input
                        type="range"
                        min="-20" max="20" step="0.5" value={opex} onChange={(e) => setOpex(parseFloat(e.target.value))}
                        className="w-full appearance-none bg-glass-border h-2 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon-coral [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(255,64,64,0.8)] [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                </div>
            </div>
        </motion.div>
    );
};
