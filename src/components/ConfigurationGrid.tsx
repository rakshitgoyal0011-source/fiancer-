import React, { useState } from 'react';
import { motion } from 'framer-motion';

const modules = [
    { id: 'integrated', title: 'Full Integrated Model', desc: 'Complete 3-statement model spanning 60 months with scenario analysis.' },
    { id: 'cashflow', title: 'Cash Flow Projection', desc: 'Deep dive into operational, investing, and financing cash flows.' },
    { id: 'ebitda', title: 'EBITDA Trends', desc: 'Isolate EBITDA margins, unit economics, and profitability markers.' },
    { id: 'burn', title: 'Burn Rate Analysis', desc: 'Runway calculation and monthly cash burn visualization.' },
    { id: 'pdf_parse', title: 'Document AI Extraction', desc: 'Extract key financial metrics, clauses, and narrative sentiment from unstructured PDFs.' },
    { id: 'valuation', title: 'DCF Valuation', desc: 'Discounted cash flow analysis with terminal value and WACC sensitivity.' },
];

export const ConfigurationGrid: React.FC<{ onGenerate: () => void }> = ({ onGenerate }) => {
    const [selected, setSelected] = useState<Set<string>>(new Set(['integrated', 'cashflow']));

    const toggle = (id: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start py-12 px-8 z-10 w-full max-w-5xl mx-auto min-h-max">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-sans font-bold text-white mb-4">Surgical Control</h2>
                <p className="text-white/50 text-lg max-w-xl mx-auto">Never generate more than you need. Isolate specific outputs to control your model's scope.</p>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full mb-12">
                {modules.map((mod) => {
                    const isSelected = selected.has(mod.id);
                    return (
                        <motion.div
                            key={mod.id}
                            onClick={() => toggle(mod.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${isSelected
                                ? 'glass-panel border-accent-violet/50 bg-accent-violet/5'
                                : 'glass-panel opacity-60 hover:opacity-100'
                                }`}
                        >
                            {/* Neon accent lock background pulse */}
                            {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent-violet/10 to-transparent pointer-events-none" />
                            )}

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className={`text-xl font-bold font-sans ${isSelected ? 'text-white' : 'text-white/70'}`}>
                                        {mod.title}
                                    </h3>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-accent-violet bg-accent-violet/20' : 'border-white/20'
                                        }`}>
                                        {isSelected && <div className="w-3 h-3 rounded-full bg-accent-violet" />}
                                    </div>
                                </div>
                                <p className="text-white/50 text-sm font-sans">{mod.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.button
                onClick={onGenerate}
                disabled={selected.size === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-12 py-4 rounded-full font-bold text-lg font-sans transition-all duration-300 ${selected.size > 0
                    ? 'bg-accent-cyan text-obsidian shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
            >
                Generate Model
            </motion.button>
        </div>
    );
};
